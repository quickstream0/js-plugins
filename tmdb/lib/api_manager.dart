import 'package:plugin/constants.dart';
import 'package:plugin_api/plugin_api.dart';

class ApiManager {
  final HostApi _host;

  ApiManager(this._host);

  String get apiKey => _host.getRandomItem(apiKeys);
  int get tvGenre => _host.getRandomItem(tvGenres);
  int get movieGenre => _host.getRandomItem(movieGenres);
  int get tvYear => _host.getRandomItem(releaseYears);
  int get movieYear => _host.getRandomItem(releaseYears);

  String _search(String title, String type) {
    return '/search/${type}?query=${title}&api_key=${apiKey}';
  }

  String _details(String type, String id) {
    return '${type}/${id}?api_key=${apiKey}&append_to_response=${appendToResponse}';
  }

  String _trending(String type, String timeWindow) {
    return '/trending/${type}/${timeWindow}?api_key=${apiKey}';
  }

  String _discover(String type) {
    return '/discover/${type}?api_key=${apiKey}';
  }

  String _tvSeasonDetails(String tvId, int seasonNumber) {
    return '/${_details("tv", tvId)}/season/${seasonNumber}?api_key=${apiKey}';
  }

  // API Calls using the private endpoint methods
  Future<List<Media>> getTrendingAll() async {
    final endpoint = _trending('all', 'week');
    final response = await _host.httpGet('${BASE_URL}${endpoint}');
    final results = response['results'] as List;
    return results.map((e) => Media.fromJson(e)).toList();
  }

  Future<List<Media>> getFeaturedTv() async {
    final endpoint = _discover("tv");
    final response = await _host.httpGet(
      '${BASE_URL}${endpoint}&with_genres=${tvGenre}&first_air_date_year=${tvYear}',
    );
    final results = response['results'] as List;
    return results.map((e) => Media.fromJson(e)).toList();
  }

  Future<List<Media>> getFeaturedMovies() async {
    final endpoint = _discover("movie");
    final response = await _host.httpGet(
      '${BASE_URL}${endpoint}&with_genres=${movieGenre}&primary_release_year=${movieYear}',
    );
    final results = response['results'] as List;
    return results.map((e) => Media.fromJson(e)).toList();
  }

  Future<List<Media>> searchItem(String query, String type) async {
    final endpoint = _search(query, type);
    final response = await _host.httpGet('${BASE_URL}${endpoint}');
    final results = response['results'] as List;
    return results.map((e) => Media.fromJson(e)).toList();
  }

  Future<List<Media>> getItemsById(String id) async {
    final response = await _host.httpGet('${BASE_URL}$id?api_key=$apiKey');
    final results = response['results'] as List;
    return results.map((e) => Media.fromJson(e)).toList();
  }

  Future<MediaDetails> getItemDetails(String id, String type) async {
    final endpoint = _details(type, id);
    final response = await _host.httpGet('${BASE_URL}${endpoint}');
    return MediaDetails.fromJson(response);
  }

  Future<SeasonDetails> getItemSeasonDetails(
    String id,
    int seasonNumber,
  ) async {
    final endpoint = _tvSeasonDetails(id, seasonNumber);
    final response = await _host.httpGet('${BASE_URL}${endpoint}');
    return SeasonDetails.fromJson(response);
  }
}
