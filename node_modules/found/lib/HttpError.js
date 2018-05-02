"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpError = function HttpError(status, data) {
  (0, _classCallCheck3.default)(this, HttpError);

  this.status = status;
  this.data = data;
};

exports.default = HttpError;
module.exports = exports["default"];