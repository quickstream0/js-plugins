// lib/bridges/api_manager_bridge.dart (inside your plugin package)

import 'package:dart_eval/dart_eval_bridge.dart';
import 'package:dart_eval/stdlib/core.dart';
import 'package:plugin/api_manager.dart';
import 'package:plugin_api/plugin_api.dart';
import 'package:plugin_api/src/bridges/media.dart';
import 'package:plugin_api/src/bridges/media_details.dart';
import 'package:plugin_api/src/bridges/season_details.dart';

class $ApiManager implements $Instance {
  final ApiManager _apiManager;

  const $ApiManager(this._apiManager);

  // The factory constructor now accepts a list of arguments.
  // This is what will be called by runtime.registerBridgeFunc.
  static $ApiManager $new(Runtime runtime, $Value? target, List<$Value?> args) {
    final hostApi = args[0]!.$reified as HostApi;
    final apiManager = ApiManager(hostApi);
    return $ApiManager(apiManager);
  }

  @override
  $Value? $getProperty(Runtime runtime, String identifier) {
    switch (identifier) {
      case 'getTrendingAll':
        return $Function((runtime, target, args) {
          final future = _apiManager.getTrendingAll();
          return $Future.wrap(
              future.then(($) => $List.wrap($.map(($) => $Media($)).toList())));
        });
      case 'getFeaturedTv':
        return $Function((runtime, target, args) {
          final future = _apiManager.getFeaturedTv();
          return $Future.wrap(
              future.then(($) => $List.wrap($.map(($) => $Media($)).toList())));
        });
      case 'getFeaturedMovies':
        return $Function((runtime, target, args) {
          final future = _apiManager.getFeaturedMovies();
          return $Future.wrap(
              future.then(($) => $List.wrap($.map(($) => $Media($)).toList())));
        });
      case 'searchItem':
        return $Function((runtime, target, args) {
          final query = (args[0] as $String).$reified;
          final type = (args[1] as $String).$reified;
          final future = _apiManager.searchItem(query, type);
          return $Future.wrap(future.then(($) => $List.wrap($.map(($) => $Media($)).toList())));
        });
      case 'getItemDetails':
        return $Function((runtime, target, args) {
          final id = (args[0] as $String).$reified;
          final type = (args[1] as $String).$reified;
          final future = _apiManager.getItemDetails(id, type);
          return $Future.wrap(future.then(($) => $MediaDetails($)));
        });
      case 'getItemSeasonDetails':
        return $Function((runtime, target, args) {
          final id = (args[0] as $String).$reified;
          final seasonNumber = (args[1] as $int).$reified;
          final future = _apiManager.getItemSeasonDetails(id, seasonNumber);
          return $Future.wrap(future.then(($) => $SeasonDetails($)));
        });
      default:
        throw StateError('Unsupported property: $identifier');
    }
  }

  @override
  void $setProperty(Runtime runtime, String identifier, $Value value) {
    throw StateError('Cannot set properties on ApiManager.');
  }

  @override
  int $getRuntimeType(Runtime runtime) {
    return runtime.lookupType(CoreTypes.object);
  }

  @override
  dynamic get $reified => _apiManager;

  @override
  $Value get $value => this;
}