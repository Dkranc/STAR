"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _pg = _interopRequireDefault(require("pg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Pool = _pg["default"].Pool;
var db = new Pool({
  host: "star-new2.cb2q7nqhmmpi.us-east-1.rds.amazonaws.com",
  // host:"database-1.crvljuomzzbe.eu-west-1.rds.amazonaws.com",
  user: "postgres",
  port: 5432,
  password: "password",
  //password:"Aa123456",
  database: "postgres"
});
exports.db = db;