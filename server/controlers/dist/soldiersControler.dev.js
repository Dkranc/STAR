"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSoldierById = exports.addSoldier = exports.getSoldiersById = exports.getSoldiers = void 0;

var _connectDB = require("../connectDB.js");

//get all soldiers from table
var getSoldiers = function getSoldiers(req, res) {
  var sqlGet = "SELECT * FROM Soldier";

  _connectDB.db.query(sqlGet, function (err, result) {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
}; //get specific row from Soldier table using a sid that can be found in the params of the request. then send only that row to the client


exports.getSoldiers = getSoldiers;

var getSoldiersById = function getSoldiersById(req, res) {
  var sid = req.params.sid;
  var sqlGet = "SELECT * FROM Soldier WHERE id= $1";

  _connectDB.db.query(sqlGet, [sid], function (err, result) {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
}; //add new soldier to table.


exports.getSoldiersById = getSoldiersById;

var addSoldier = function addSoldier(req, res) {
  var _req$body = req.body,
      serial_id = _req$body.serial_id,
      full_name = _req$body.full_name;
  var sqlInsert = "INSERT INTO Soldier(serial_id, full_name) VALUES($1,$2)";

  _connectDB.db.query(sqlInsert, [serial_id, full_name], function (err, result) {
    if (err) console.log(err);
  });
}; //update a soldier by its id


exports.addSoldier = addSoldier;

var updateSoldierById = function updateSoldierById(req, res) {
  var sid = req.params.sid;
  var _req$body2 = req.body,
      serial_id = _req$body2.serial_id,
      full_name = _req$body2.full_name;
  var sqlUpdateTrans = "UPDATE Soldier SET serial_id=$1, full_name=$2 WHERE id = $3";

  _connectDB.db.query(sqlUpdateTrans, [serial_id, full_name, sid], function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
};

exports.updateSoldierById = updateSoldierById;