"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMashadTestsById = exports.getTestTypes = exports.getTestTypesById = void 0;

var _connectDB = require("../connectDB.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//get   test type by id
var getTestTypesById = function getTestTypesById(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var rrid = req.params.rrid;
    var sqlGet = "SELECT * FROM test_type WHERE role_id= $1 AND is_mashad_test= false";

    _connectDB.db.query(sqlGet, [rrid], function (err, result) {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (err) {
    console.log(err);
  }
}; //get  all the test types 


exports.getTestTypesById = getTestTypesById;

var getTestTypes = function getTestTypes(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var sqlGet = "SELECT * FROM test_type;";

    _connectDB.db.query(sqlGet, function (err, result) {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getTestTypes = getTestTypes;

var getMashadTestsById = function getMashadTestsById(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var rrid = req.params.rrid;
    var sqlGet = "SELECT * FROM test_type WHERE role_id= $1 AND is_mashad_test= true";

    _connectDB.db.query(sqlGet, [rrid], function (err, result) {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (_unused) {
    console.log("bad token");
  }
};

exports.getMashadTestsById = getMashadTestsById;