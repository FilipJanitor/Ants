'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _elementType = require('prop-types-extra/lib/elementType');

var _elementType2 = _interopRequireDefault(_elementType);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  Component: _elementType2.default.isRequired,
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  match: _propTypes2.default.object.isRequired,
  activeClassName: _propTypes2.default.string,
  activeStyle: _propTypes2.default.object,
  activePropName: _propTypes2.default.string,
  router: _PropTypes.routerShape.isRequired,
  exact: _propTypes2.default.bool.isRequired,
  target: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  childProps: _propTypes2.default.object // In case of name conflicts here.
};

var defaultProps = {
  Component: 'a',
  exact: false
};

var BaseLink = function (_React$Component) {
  (0, _inherits3.default)(BaseLink, _React$Component);

  function BaseLink() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BaseLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          target = _this$props.target,
          router = _this$props.router,
          to = _this$props.to;


      if (onClick) {
        onClick(event);
      }

      // Don't do anything if the user's onClick handler prevented default.
      // Otherwise, let the browser handle the link with the computed href if the
      // event wasn't an unmodified left click, or if the link has a target.
      if (event.defaultPrevented || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0 || target) {
        return;
      }

      event.preventDefault();

      // FIXME: When clicking on a link to the same location in the browser, the
      // actual becomes a replace rather than a push. We may want the same
      // handling – perhaps implemented in the Farce protocol.
      router.push(to);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  BaseLink.prototype.render = function render() {
    var _props = this.props,
        Component = _props.Component,
        to = _props.to,
        match = _props.match,
        activeClassName = _props.activeClassName,
        activeStyle = _props.activeStyle,
        activePropName = _props.activePropName,
        router = _props.router,
        exact = _props.exact,
        childProps = _props.childProps,
        props = (0, _objectWithoutProperties3.default)(_props, ['Component', 'to', 'match', 'activeClassName', 'activeStyle', 'activePropName', 'router', 'exact', 'childProps']);


    if (process.env.NODE_ENV !== 'production' && props.component) {
      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(typeof Component === 'function', 'Link to %s with `component` prop `%s` has an element type that ' + 'is not a component. The expected prop for the link component is ' + '`Component`.', (0, _stringify2.default)(to), props.component.displayName || props.component.name) : void 0;
    }

    if (activeClassName || activeStyle || activePropName) {
      var toLocation = router.createLocation(to);
      var active = router.isActive(match, toLocation, { exact: exact });

      if (active) {
        if (activeClassName) {
          props.className = props.className ? props.className + ' ' + activeClassName : activeClassName;
        }

        if (activeStyle) {
          props.style = (0, _extends3.default)({}, props.style, activeStyle);
        }
      }

      if (activePropName) {
        props[activePropName] = active;
      }
    }

    return _react2.default.createElement(Component, (0, _extends3.default)({}, props, childProps, {
      href: router.createHref(to),
      onClick: this.onClick // This overrides props.onClick.
    }));
  };

  return BaseLink;
}(_react2.default.Component);

BaseLink.propTypes = propTypes;
BaseLink.defaultProps = defaultProps;

exports.default = BaseLink;
module.exports = exports['default'];