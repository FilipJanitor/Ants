'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createElements;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _ResolverUtils = require('./ResolverUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createElements(routeMatches, Components, matchData) {
  return routeMatches.map(function (match, i) {
    var route = match.route;


    var Component = Components[i];
    var data = matchData[i];

    var isComponentResolved = (0, _ResolverUtils.isResolved)(Component);
    var areDataResolved = (0, _ResolverUtils.isResolved)(data);

    if (route.render) {
      // Perhaps undefined here would be more correct for "not ready", but
      // Relay uses null in RelayReadyStateRenderer, so let's follow that
      // convention.
      return route.render({
        match: match,
        Component: isComponentResolved ? Component : null,
        props: areDataResolved ? (0, _extends3.default)({}, match, { data: data }) : null,
        data: areDataResolved ? data : null
      });
    }

    if (!isComponentResolved || !areDataResolved) {
      // Can't render.
      return undefined;
    }

    if (!Component) {
      // Note this check would be wrong on potentially unresolved data.
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(data === undefined, 'Route %s with data has no render method or component.', i) : void 0;

      // Nothing to render.
      return null;
    }

    return _react2.default.createElement(Component, (0, _extends3.default)({}, match, { data: data }));
  });
}
module.exports = exports['default'];