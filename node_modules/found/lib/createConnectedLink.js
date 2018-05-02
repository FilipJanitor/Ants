'use strict';

exports.__esModule = true;
exports.default = createConnectedLink;

var _BaseLink = require('./BaseLink');

var _BaseLink2 = _interopRequireDefault(_BaseLink);

var _createWithRouter = require('./createWithRouter');

var _createWithRouter2 = _interopRequireDefault(_createWithRouter);

var _withRouter = require('./withRouter');

var _withRouter2 = _interopRequireDefault(_withRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createConnectedLink(options) {
  var withRouter = options ? (0, _createWithRouter2.default)(options) : _withRouter2.default;
  return withRouter(_BaseLink2.default);
}
module.exports = exports['default'];