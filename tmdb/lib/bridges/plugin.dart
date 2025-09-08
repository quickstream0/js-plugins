// lib/bridges/plugin.dart (inside your plugin package)

import 'package:dart_eval/dart_eval_bridge.dart';
import 'package:dart_eval/stdlib/core.dart';
import 'package:plugin/main.dart';
import 'package:plugin_api/plugin_api.dart';
import 'package:plugin_api/src/bridges/media.dart';
import 'package:plugin_api/src/bridges/media_category.dart';
import 'package:plugin_api/src/bridges/media_details.dart';
import 'package:plugin_api/src/bridges/season_details.dart';

class $Plugin implements $Instance {
  final Plugin _plugin;

  const $Plugin(this._plugin);

  // This factory is what's registered with dart_eval to create a new Plugin instance.
  static $Plugin $new(Runtime runtime, $Value? target, List<$Value?> args) {
    // We expect the first argument to be the bridged HostApi instance.
    final hostApi = args[0]!.$reified as HostApi;
    final plugin = Plugin(hostApi);
    return $Plugin(plugin);
  }

  @override
  $Value? $getProperty(Runtime runtime, String identifier) {
    switch (identifier) {
      case 'searchItem':
        return $Function((runtime, target, args) {
          final query = (args[0] as $String).$reified;
          final type = (args[1] as $String).$reified;
          final future = _plugin.searchItem(query, type);
          return $Future.wrap(future.then(($) => $List.wrap($.map(($) => $Media($)).toList())));
        });
      case 'getItemsById':
        return $Function((runtime, target, args) {
          final id = (args[0] as $String).$reified;
          final future = _plugin.getItemsById(id);
          return $Future.wrap(future.then(($) => $List.wrap($.map(($) => $Media($)).toList())));
        });
      case 'getHomeRecommendations':
        return $Function((runtime, target, args) {
          final future = _plugin.getHomeRecommendations();
          return $Future.wrap(future.then(($) => $List.wrap($.map(($) => $MediaCategory($)).toList())));
        });
      case 'getItemDetails':
        return $Function((runtime, target, args) {
          final id = (args[0] as $String).$reified;
          final type = (args[1] as $String).$reified;
          final future = _plugin.getItemDetails(id, type);
          return $Future.wrap(future.then(($) => $MediaDetails($)));
        });
      case 'getItemSeasonDetails':
        return $Function((runtime, target, args) {
          final id = (args[0] as $String).$reified;
          final seasonNumber = (args[1] as $int).$reified;
          final future = _plugin.getItemSeasonDetails(id, seasonNumber);
          return $Future.wrap(future.then(($) => $SeasonDetails($)));
        });
      default:
        throw StateError('Unsupported property: $identifier');
    }
  }

  @override
  void $setProperty(Runtime runtime, String identifier, $Value value) {
    throw StateError('Cannot set properties on Plugin.');
  }

  @override
  int $getRuntimeType(Runtime runtime) {
    return runtime.lookupType(CoreTypes.object);
  }

  @override
  dynamic get $reified => _plugin;

  @override
  $Value get $value => this;
}