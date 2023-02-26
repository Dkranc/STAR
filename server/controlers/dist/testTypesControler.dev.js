"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMashadTestsById = exports.getTestTypesById = void 0;

var _connectDB = require("../connectDB.js");

//get  all the test types (only four- static)
var getTestTypesById = function getTestTypesById(req, res) {
  var rrid = req.params.rrid;
  var sqlGet = "SELECT * FROM test_type WHERE role_id= $1 AND is_mashad_test= false";

  _connectDB.db.query(sqlGet, [rrid], function (err, result) {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

exports.getTestTypesById = getTestTypesById;

var getMashadTestsById = function getMashadTestsById(req, res) {
  var rrid = req.params.rrid;
  var sqlGet = "SELECT * FROM test_type WHERE role_id= $1 AND is_mashad_test= true";

  _connectDB.db.query(sqlGet, [rrid], function (err, result) {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

exports.getMashadTestsById = getMashadTestsById;