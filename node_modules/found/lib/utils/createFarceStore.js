'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createFarceStore;

var _Actions = require('farce/lib/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _createHistoryEnhancer = require('farce/lib/createHistoryEnhancer');

var _createHistoryEnhancer2 = _interopRequireDefault(_createHistoryEnhancer);

var _queryMiddleware = require('farce/lib/queryMiddleware');

var _queryMiddleware2 = _interopRequireDefault(_queryMiddleware);

var _redux = require('redux');

var _createMatchEnhancer = require('../createMatchEnhancer');

var _createMatchEnhancer2 = _interopRequireDefault(_createMatchEnhancer);

var _foundReducer = require('../foundReducer');

var _foundReducer2 = _interopRequireDefault(_foundReducer);

var _Matcher = require('../Matcher');

var _Matcher2 = _interopRequireDefault(_Matcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFarceStore(_ref) {
  var historyProtocol = _ref.historyProtocol,
      historyMiddlewares = _ref.historyMiddlewares,
      historyOptions = _ref.historyOptions,
      routeConfig = _ref.routeConfig;

  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    found: _foundReducer2.default
  }), (0, _redux.compose)((0, _createHistoryEnhancer2.default)((0, _extends3.default)({}, historyOptions, {
    protocol: historyProtocol,
    middlewares: historyMiddlewares || [_queryMiddleware2.default]
  })), (0, _createMatchEnhancer2.default)(new _Matcher2.default(routeConfig))));

  store.dispatch(_Actions2.default.init());

  return store;
}
module.exports = exports['default'];