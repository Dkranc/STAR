"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFactGen = exports.updateFact = exports.addFact = exports.getFactsByTestId = exports.getFact = void 0;

var _connectDB = require("../connectDB.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
};

exports.getFact = getFact;

var getFactsByTestId = function getFactsByTestId(req, res) {//continue from here!!
}; //add new fact to table.


exports.getFactsByTestId = getFactsByTestId;

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
}; //add facts to table from general mashad nput.


exports.updateFact = updateFact;

var addFactGen = function addFactGen(req, res) {
  var completedArray = req.body[0];
  var ttid = req.body[1];
  var rid = req.body[2];
  var sqlInsert = "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES($1,$2,$3,$4,$5,$6,$7)";

  for (var _i = 0, _Object$entries = Object.entries(completedArray); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        keyQuestion = _Object$entries$_i[0],
        valQuestion = _Object$entries$_i[1];

    for (var _i2 = 0, _Object$entries2 = Object.entries(valQuestion); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          keySol = _Object$entries2$_i[0],
          valueAns = _Object$entries2$_i[1];

      _connectDB.db.query(sqlInsert, [keySol, ttid, rid, new Date().toISOString().slice(0, 10), keyQuestion, valueAns ? 1 : 0, null], function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  res.status(200).send("wrote to table");
};

exports.addFactGen = addFactGen;