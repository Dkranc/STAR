"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrainingById = exports.addTraining = exports.getTrainingByDate = exports.getTrainingById = exports.getTrainings = void 0;

var _connectDB = require("../connectDB.js");

//get  all the trainings
var getTrainings = function getTrainings(req, res) {
  var sqlGet = "SELECT * FROM Training;";

  _connectDB.db.query(sqlGet, function (err, result) {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
}; //get specific row from Training table using a sid that can be found in the params of the request. then send only that row to the client


exports.getTrainings = getTrainings;

var getTrainingById = function getTrainingById(req, res) {
  var tid = req.params.tid;
  var sqlGet = "SELECT * FROM Training WHERE id= (?);";

  _connectDB.db.query(sqlGet, [tid], function (err, result) {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
}; //get specific row from Training table using the current date


exports.getTrainingById = getTrainingById;

var getTrainingByDate = function getTrainingByDate(req, res) {
  var date = req.params.date;
  var sqlGet = "SELECT * FROM Training WHERE start_date < Cast( $1 as date )  AND Cast( $2 as date ) < end_date ";

  _connectDB.db.query(sqlGet, [date, date], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(402).json(err);
    }

    res.send(result.rows);
  });
}; //add new training to table.


exports.getTrainingByDate = getTrainingByDate;

var addTraining = function addTraining(req, res) {
  var _req$body = req.body,
      battalion_id = _req$body.battalion_id,
      start_date = _req$body.start_date,
      end_date = _req$body.end_date;
  var sqlInsert = "INSERT INTO Training(battalion_id, start_date, end_date) VALUES(?,?,?)";

  _connectDB.db.query(sqlInsert, [battalion_id, start_date, end_date], function (err, result) {
    if (err) console.log(err);
  });
}; //update a training by its id


exports.addTraining = addTraining;

var updateTrainingById = function updateTrainingById(req, res) {
  var tid = req.params.tid;
  var _req$body2 = req.body,
      battalion_id = _req$body2.battalion_id,
      start_date = _req$body2.start_date,
      end_date = _req$body2.end_date;
  var sqlUpdateTrans = "UPDATE Training SET battalion_id =?, start_date=? , end_date=? WHERE id = ?";

  _connectDB.db.query(sqlUpdateTrans, [battalion_id, start_date, end_date, tid], function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
};

exports.updateTrainingById = updateTrainingById;