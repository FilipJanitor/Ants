"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This isn't really an error.
var RedirectException = function RedirectException(location) {
  (0, _classCallCheck3.default)(this, RedirectException);

  this.location = location;
};

exports.default = RedirectException;
module.exports = exports["default"];