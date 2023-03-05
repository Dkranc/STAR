"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFact = exports.addFact = exports.getFact = void 0;

var _connectDB = require("../connectDB.js");

//get specific rows from Question table using a test type id and the soldier sereial id that can be found in the params of the request. then send only those rows to the client
var getFact = function getFact(req, res) {
  var _req$params = req.params,
      ssid = _req$params.ssid,
      ttid = _req$params.ttid;
  var firstDay = new Date();
  firstDay.setDate(firstDay.getDate() + 5);
  firstDay = firstDay.toISOString().slice(0, 10);
  var lastDay = new Date();
  lastDay.setDate(lastDay.getDate() - 5);
  lastDay = lastDay.toISOString().slice(0, 10);
  var sqlGet = "SELECT * FROM fact WHERE soldier_serial_id=$1 AND test_type_id=$2 AND  date BETWEEN $3 AND $4;";

  _connectDB.db.query(sqlGet, [ssid, ttid, lastDay, firstDay], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(402).json(err);
    }

    res.send(result.rows);
  });
}; //add new fact to table.


exports.getFact = getFact;

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
  var facts = req.body[0];
  var comments = req.body[1];
  var date = req.body[2];
  var sqlUpdateTrans = "UPDATE Fact SET date=$1, score=$2, comment=$3 WHERE id = $4";
  facts.map(function (fact, ind) {
    _connectDB.db.query(sqlUpdateTrans, [date, fact.score, comments[ind], fact.id], function (err, result) {
      if (err) console.log(err);
    });
  });
  res.sendStatus(200);
};

exports.updateFact = updateFact;