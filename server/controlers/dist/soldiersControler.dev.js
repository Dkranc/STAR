"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSoldiersCompanyInfo = exports.updateSoldierById = exports.addSoldier = exports.getSoldiersById = exports.getSoldiers = exports.getSoldiersByTrainingWeek = void 0;

var _express = require("express");

var _connectDB = require("../connectDB.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//get soldiers by week number
var getSoldiersByTrainingWeek = function getSoldiersByTrainingWeek(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var tid = req.params.tid;
    console.log(tid);
    var sqlGet = "SELECT * FROM soldier WHERE week_number = $1";

    _connectDB.db.query(sqlGet, [tid], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }

      console.log(result.rows);
      res.send(result.rows);
    });
  } catch (_unused) {
    console.log("bad token");
  }
}; //get all soldiers from table


exports.getSoldiersByTrainingWeek = getSoldiersByTrainingWeek;

var getSoldiers = function getSoldiers(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var sqlGet = "SELECT * FROM Soldier";

    _connectDB.db.query(sqlGet, function (err, result) {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (_unused2) {
    console.log("bad token");
  }
}; //get specific row from Soldier table using a sid that can be found in the params of the request. then send only that row to the client


exports.getSoldiers = getSoldiers;

var getSoldiersById = function getSoldiersById(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var sid = req.params.sid;
    var sqlGet = "SELECT * FROM Soldier WHERE id= $1";

    _connectDB.db.query(sqlGet, [sid], function (err, result) {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (_unused3) {
    console.log("bad token");
  }
}; //add new soldier to table.


exports.getSoldiersById = getSoldiersById;

var addSoldier = function addSoldier(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var serial_id = req.body[0];
    var first_name = req.body[1];
    var last_name = req.body[2];
    var pluga = req.body[3];
    var role = req.body[4];
    var week_number = req.body[5];
    var mail = req.body[6];
    var sqlInsert = "INSERT INTO Soldier(soldier_serial_id, first_name, pluga, parent_external_id, mail, role, last_name, week_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";

    _connectDB.db.query(sqlInsert, [serial_id, first_name, pluga, 0, mail, role, last_name, week_number], function (err, result) {
      if (err) console.log(err);else {
        res.send(result);
      }
    });
  } catch (_unused4) {
    console.log("bad token");
  }
}; //update a soldier by its id


exports.addSoldier = addSoldier;

var updateSoldierById = function updateSoldierById(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var sid = req.params.sid;
    var serial_id = req.body[0];
    var first_name = req.body[1];
    var last_name = req.body[2];
    var pluga = req.body[3];
    var role = req.body[4];
    var week_number = req.body[5];
    var mail = req.body[6];
    var sqlUpdateTrans = "UPDATE Soldier SET soldier_serial_id=$1, first_name=$2, pluga=$3,  parent_external_id=$4,  mail=$5, role=$6, last_name=$7, week_number=$8  WHERE id = $9";

    _connectDB.db.query(sqlUpdateTrans, [serial_id, first_name, pluga, 0, mail, role, last_name, week_number, sid], function (err, result) {
      if (err) console.log(err);
      res.send(result);
    });
  } catch (_unused5) {
    console.log("bad token");
  }
}; //update a soldier by its id


exports.updateSoldierById = updateSoldierById;

var updateSoldiersCompanyInfo = function updateSoldiersCompanyInfo(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var soldiers = req.body[0];
    var sqlUpdate = "UPDATE Soldier SET company=$1 WHERE serial_id = $2";

    for (var _i = 0, _Object$entries = Object.entries(soldiers); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          company = _Object$entries$_i[0],
          soldierList = _Object$entries$_i[1];

      for (var _i2 = 0, _Object$entries2 = Object.entries(soldierList); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            soldier_serial_id = _Object$entries2$_i[0],
            soldierValue = _Object$entries2$_i[1];

        if (soldierValue) {
          //only if the solider value is true. else we dont add.
          _connectDB.db.query(sqlUpdate, [company === "1" ? "א" : company === "2" ? "ב" : "ג", soldier_serial_id], function (err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            }
          });
        }
      }
    }

    res.status(200).send("updated");
  } catch (_unused6) {
    console.log("bad token");
  }
};

exports.updateSoldiersCompanyInfo = updateSoldiersCompanyInfo;