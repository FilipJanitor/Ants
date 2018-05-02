'use strict';

exports.__esModule = true;
exports.routerShape = exports.matcherShape = exports.matchShape = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The shape might be different with a custom matcher or history enhancer, but
// the default matcher assumes and provides this shape. As such, this validator
// is purely for user convenience and should not be used internally.
var matchShape = exports.matchShape = _propTypes2.default.shape({
  location: _propTypes2.default.shape({
    pathname: _propTypes2.default.string.isRequired,
    query: _propTypes2.default.object.isRequired
  }).isRequired,
  params: _propTypes2.default.object.isRequired
});

// User code generally shouldn't need this, but it doesn't hurt to export here,
// since we use it for routerShape below.
var matcherShape = exports.matcherShape = _propTypes2.default.shape({
  match: _propTypes2.default.func.isRequired,
  getRoutes: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.func.isRequired,
  format: _propTypes2.default.func.isRequired
});

var routerShape = exports.routerShape = _propTypes2.default.shape({
  push: _propTypes2.default.func.isRequired,
  replace: _propTypes2.default.func.isRequired,
  go: _propTypes2.default.func.isRequired,

  createHref: _propTypes2.default.func.isRequired,
  createLocation: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.func.isRequired,
  matcher: matcherShape.isRequired,

  addTransitionHook: _propTypes2.default.func.isRequired
});