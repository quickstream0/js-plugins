// 'package:plugin/main.dart'

import 'dart:async';
import 'package:dart_eval/dart_eval_bridge.dart';
import 'package:plugin/api_manager.dart';
import 'package:plugin/bridges/plugin.dart';
import 'package:plugin/bridges/api_manager.dart';
import 'package:plugin_api/plugin_api.dart';

// This class implements the defined contract.
class Plugin implements PluginInterface {
  final ApiManager _apiManager;

  Plugin(HostApi hostApi) : _apiManager = ApiManager(hostApi);

  @override
  Future<List<Media>> searchItem(String query, String type) async {
    return _apiManager.searchItem(query, type);
  }

  @override
  Future<List<Media>> getItemsById(String id) async {
    return _apiManager.getItemsById(id);
  }

  @override
  Future<List<MediaCategory>> getHomeRecommendations() async {
    final List<MediaCategory> categories = [];

    final trendingAll = await _apiManager.getTrendingAll();
    categories.add(
      MediaCategory(
        name: 'Trending this Week',
        id: '/trending/all/week',
        media: trendingAll,
      ),
    );

    final featuredTv = await _apiManager.getFeaturedTv();
    categories.add(
      MediaCategory(
        name: 'Featured Tv Shows',
        id: '/discover/tv',
        media: featuredTv,
      ),
    );

    final featuredMovies = await _apiManager.getFeaturedMovies();
    categories.add(
      MediaCategory(
        name: 'Featured Movies',
        id: '/discover/movie',
        media: featuredMovies,
      ),
    );

    return categories;
  }

  @override
  Future<MediaDetails> getItemDetails(String id, String type) async {
    return _apiManager.getItemDetails(id, type);
  }

  @override
  Future<SeasonDetails> getItemSeasonDetails(
    String id,
    int seasonNumber,
  ) async {
    return _apiManager.getItemSeasonDetails(id, seasonNumber);
  }
}

// late PluginInterface pluginInstance;

void registerPluginBridges(Runtime runtime, HostApi hostApi) {
  // Register the ApiManager bridge
  runtime.registerBridgeFunc(
    'package:plugin/api_manager.dart',
    'ApiManager',
    (runtime, target, args) {
      // Create the ApiManager instance with the reified hostApi
      final apiManager = ApiManager(hostApi);
      return $ApiManager(apiManager);
    },
  );

  // Register the  bridge
  runtime.registerBridgeFunc(
    'package:plugin/main.dart',
    'Plugin',
    (runtime, target, args) {
      // Create the Plugin instance with the reified hostApi
      final plugin = Plugin(hostApi);
      return $Plugin(plugin);
    },
  );
}

Future<Plugin> getPluginInstance(HostApi hostApi) async {
  return Plugin(hostApi);
}
