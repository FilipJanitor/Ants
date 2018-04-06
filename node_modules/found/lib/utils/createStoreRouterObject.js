'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createStoreRouterObject;

var _Actions = require('farce/lib/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAVIGATION_ACTION_CREATORS = {
  push: _Actions2.default.push,
  replace: _Actions2.default.replace,
  go: _Actions2.default.go
};

function createStoreRouterObject(store) {
  var farce = store.farce,
      found = store.found;
  var matcher = found.matcher;


  return (0, _extends3.default)({}, (0, _redux.bindActionCreators)(NAVIGATION_ACTION_CREATORS, store.dispatch), farce, found, {

    // Expose isActive from matcher directly for convenience. This pattern is
    // faster than using matcher.isActive.bind(matcher).
    isActive: function isActive(match, location, options) {
      return matcher.isActive(match, location, options);
    }
  });
}
module.exports = exports['default'];