'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('../PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  router: _PropTypes.routerShape.isRequired,
  children: _propTypes2.default.element.isRequired
};

var childContextTypes = {
  router: _PropTypes.routerShape.isRequired
};

var RouterProvider = function (_React$Component) {
  (0, _inherits3.default)(RouterProvider, _React$Component);

  function RouterProvider() {
    (0, _classCallCheck3.default)(this, RouterProvider);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  RouterProvider.prototype.getChildContext = function getChildContext() {
    return {
      router: this.props.router
    };
  };

  // This doesn't need the logic for changes to the router object; it's only
  // used for server-side rendering and should only render once.

  RouterProvider.prototype.render = function render() {
    return this.props.children;
  };

  return RouterProvider;
}(_react2.default.Component);

RouterProvider.propTypes = propTypes;
RouterProvider.childContextTypes = childContextTypes;

exports.default = RouterProvider;
module.exports = exports['default'];