"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFact = exports.addFact = void 0;

var _connectDB = require("../connectDB.js");

//add new fact to table.
var addFact = function addFact(req, res) {
  var soldier_serial_id = req.body[0];
  var test_type_id = req.body[1];
  var role = req.body[2];
  var date = req.body[3];
  var questions = req.body[4]; //is array of the questions

  var scores = req.body[5]; //is array

  var parent_external_id = req.body[6]; //null for now- will be battalion number of soldier

  var comments = req.body[7]; //is array

  for (var i = 0; i < scores.length; i++) {
    var sqlInsert = "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id, comment) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";

    _connectDB.db.query(sqlInsert, [soldier_serial_id, test_type_id, role, date, questions[i].id, typeof scores[i] == "string" ? scores[i] ? 1 : 0 : scores[i], //if boolean then 1 for true, 0 for false, else just input the number
    parent_external_id, comments[i]], function (err, result) {
      if (err) {
        console.log(err);
      }
    });
  }

  res.status(200).send("wrote to table");
}; //update a fact by its id


exports.addFact = addFact;

var updateFact = function updateFact(req, res) {
  var fid = req.params.fid;
  var _req$body = req.body,
      soldier_serial_id = _req$body.soldier_serial_id,
      test_type_id = _req$body.test_type_id,
      role = _req$body.role,
      date = _req$body.date,
      question_id = _req$body.question_id,
      score = _req$body.score,
      parent_external_id = _req$body.parent_external_id;
  var sqlUpdateTrans = "UPDATE Fact SET soldier_serial_id=$1, test_type_id=$2, role=$3, date=$4, question_id=$5, score=$6, parent_external_id=$7 WHERE id = $8";

  _connectDB.db.query(sqlUpdateTrans, [soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id, fid], function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
};

exports.updateFact = updateFact;