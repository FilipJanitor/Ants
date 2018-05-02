'use strict';

exports.__esModule = true;
exports.default = createRender;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactStaticContainer = require('react-static-container');

var _reactStaticContainer2 = _interopRequireDefault(_reactStaticContainer);

var _ElementsRenderer = require('./ElementsRenderer');

var _ElementsRenderer2 = _interopRequireDefault(_ElementsRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// These are intentionally not renderLoading, renderFetched, and renderFailure
// from Relay, because these don't quite correspond to those conditions.
function createRender(_ref) {
  var renderPending = _ref.renderPending,
      renderReady = _ref.renderReady,
      renderError = _ref.renderError;

  return function render(renderArgs) {
    var error = renderArgs.error,
        elements = renderArgs.elements;

    var element = void 0;

    if (error) {
      element = renderError ? renderError(renderArgs) : null;
    } else if (!elements) {
      element = renderPending ? renderPending(renderArgs) : undefined;
    } else if (renderReady) {
      element = renderReady(renderArgs);
    } else {
      element = _react2.default.createElement(_ElementsRenderer2.default, { elements: elements });
    }

    var hasElement = element !== undefined;

    return _react2.default.createElement(
      _reactStaticContainer2.default,
      { shouldUpdate: hasElement },
      hasElement ? element : null
    );
  };
}
module.exports = exports['default'];