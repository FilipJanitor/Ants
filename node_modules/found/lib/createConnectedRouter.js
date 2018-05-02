'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createConnectedRouter;

var _reactRedux = require('react-redux');

var _ActionTypes = require('./ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _createBaseRouter = require('./createBaseRouter');

var _createBaseRouter2 = _interopRequireDefault(_createBaseRouter);

var _createStoreRouterObject = require('./utils/createStoreRouterObject');

var _createStoreRouterObject2 = _interopRequireDefault(_createStoreRouterObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveMatch(match) {
  return {
    type: _ActionTypes2.default.RESOLVE_MATCH,
    payload: match
  };
}

function createConnectedRouter(_ref) {
  var _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === undefined ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      options = (0, _objectWithoutProperties3.default)(_ref, ['getFound']);

  var ConnectedRouter = (0, _reactRedux.connect)(function (state) {
    var _getFound = getFound(state),
        match = _getFound.match,
        resolvedMatch = _getFound.resolvedMatch;

    return { match: match, resolvedMatch: resolvedMatch };
  }, {
    onResolveMatch: resolveMatch
  }, null, {
    // Don't block context propagation from above. The router should seldom
    // be unnecessarily rerendering anyway.
    pure: false
  })((0, _createBaseRouter2.default)(options));

  // This implementation is very messy, but it provides the cleanest API to get
  // these methods into the base router from the store, since they're already
  // on the store context.

  // Overwriting the method instead of extending the class is used to avoid
  // issues with compatibility on IE <= 10.
  var baseAddExtraProps = ConnectedRouter.prototype.addExtraProps;

  function addExtraProps(props) {
    if (!this.router) {
      this.router = (0, _createStoreRouterObject2.default)(this.props.store || this.context.store);
    }

    return (0, _extends3.default)({}, baseAddExtraProps.call(this, props), {
      router: this.router
    });
  }

  ConnectedRouter.prototype.addExtraProps = addExtraProps;

  return ConnectedRouter;
}
module.exports = exports['default'];