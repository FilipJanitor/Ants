'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = createFarceRouter;

var _Actions = require('farce/lib/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _createConnectedRouter = require('./createConnectedRouter');

var _createConnectedRouter2 = _interopRequireDefault(_createConnectedRouter);

var _createFarceStore = require('./utils/createFarceStore');

var _createFarceStore2 = _interopRequireDefault(_createFarceStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFarceRouter(_ref) {
  var store = _ref.store,
      historyProtocol = _ref.historyProtocol,
      historyMiddlewares = _ref.historyMiddlewares,
      historyOptions = _ref.historyOptions,
      routeConfig = _ref.routeConfig,
      options = (0, _objectWithoutProperties3.default)(_ref, ['store', 'historyProtocol', 'historyMiddlewares', 'historyOptions', 'routeConfig']);

  var ConnectedRouter = (0, _createConnectedRouter2.default)(options);

  var FarceRouter = function (_React$Component) {
    (0, _inherits3.default)(FarceRouter, _React$Component);

    function FarceRouter(props, context) {
      (0, _classCallCheck3.default)(this, FarceRouter);

      var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props, context));

      _this.store = store || (0, _createFarceStore2.default)({
        historyProtocol: historyProtocol,
        historyMiddlewares: historyMiddlewares,
        historyOptions: historyOptions,
        routeConfig: routeConfig
      });
      return _this;
    }

    FarceRouter.prototype.componentWillUnmount = function componentWillUnmount() {
      this.store.dispatch(_Actions2.default.dispose());
    };

    FarceRouter.prototype.render = function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2.default.createElement(ConnectedRouter, this.props)
      );
    };

    return FarceRouter;
  }(_react2.default.Component);

  return FarceRouter;
}
module.exports = exports['default'];