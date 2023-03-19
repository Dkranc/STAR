"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(req, res) {
  var secret = req.body[0];

  var token = _jsonwebtoken["default"].sign({
    secret: secret
  }, "9809502", {
    expiresIn: "1h"
  });

  res.send(token);
};

exports.login = login;