'use strict';

exports.__esModule = true;
exports.default = getStoreRenderArgs;

var _getRenderArgs = require('./getRenderArgs');

var _getRenderArgs2 = _interopRequireDefault(_getRenderArgs);

var _createStoreRouterObject = require('./utils/createStoreRouterObject');

var _createStoreRouterObject2 = _interopRequireDefault(_createStoreRouterObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function returns a promise. It doesn't need to be an async function
// because it doesn't use the promise's value.
function getStoreRenderArgs(_ref) {
  var store = _ref.store,
      _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === undefined ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      matchContext = _ref.matchContext,
      resolver = _ref.resolver;

  var router = (0, _createStoreRouterObject2.default)(store);
  var match = getFound(store.getState()).resolvedMatch;

  return (0, _getRenderArgs2.default)({
    router: router,
    match: match,
    matchContext: matchContext,
    resolver: resolver
  });
}
module.exports = exports['default'];