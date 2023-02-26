"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQuestionsByParentId = exports.getQuestionsByTestTypeId = void 0;

var _connectDB = require("../connectDB.js");

//get specific rows from Question table using a test type id that can be found in the params of the request. then send only those rows to the client
var getQuestionsByTestTypeId = function getQuestionsByTestTypeId(req, res) {
  var ttid = req.params.ttid;
  var sqlGet = "SELECT * FROM question WHERE test_type_id=$1";

  _connectDB.db.query(sqlGet, [ttid], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(402).json(err);
    }

    res.send(result.rows);
  });
}; //get specific rows from Question table using a parent id .


exports.getQuestionsByTestTypeId = getQuestionsByTestTypeId;

var getQuestionsByParentId = function getQuestionsByParentId(req, res) {
  var pid = req.params.pid;
  var sqlGet = "SELECT * FROM question WHERE parent_id=$1";

  _connectDB.db.query(sqlGet, [pid], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(402).json(err);
    }

    res.send(result.rows);
  });
};

exports.getQuestionsByParentId = getQuestionsByParentId;