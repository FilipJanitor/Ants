'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createWithRouter;

var _reactRedux = require('react-redux');

var _PropTypes = require('./PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerContextTypes = {
  router: _PropTypes.routerShape.isRequired
};

function createWithRouter(_ref) {
  var _ref$getFound = _ref.getFound,
      getFound = _ref$getFound === undefined ? function (_ref2) {
    var found = _ref2.found;
    return found;
  } : _ref$getFound,
      _ref$matchKey = _ref.matchKey,
      matchKey = _ref$matchKey === undefined ? 'resolvedMatch' : _ref$matchKey;

  var withMatch = (0, _reactRedux.connect)(function (state) {
    return { match: getFound(state)[matchKey] };
  }, null, function (stateProps, dispatchProps, ownProps) {
    return (0, _extends3.default)({}, ownProps, stateProps);
  }
  // We don't want dispatch here.

  // This needs to be pure, to avoid rerendering on changes to other matchKey
  // values in the store.
  );

  return function withRouter(Component) {
    var ConnectedComponent = withMatch(Component);

    // Yes, this is pretty gross. It's the simplest way to inject router as
    // a prop without adding yet another wrapper component, though.

    ConnectedComponent.contextTypes = (0, _extends3.default)({}, ConnectedComponent.contextTypes, routerContextTypes);

    // Overwriting the method instead of extending the class is used to avoid
    // issues with compatibility on IE <= 10.
    var baseAddExtraProps = ConnectedComponent.prototype.addExtraProps;

    function addExtraProps(props) {
      return (0, _extends3.default)({}, baseAddExtraProps.call(this, props), {

        // It's safe to read from the context because the router context
        // methods should never change. With the default implementation, they
        // in fact can't change.
        router: this.context.router
      });
    }

    ConnectedComponent.prototype.addExtraProps = addExtraProps;

    return ConnectedComponent;
  };
}
module.exports = exports['default'];