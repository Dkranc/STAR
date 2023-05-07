"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcFinalFactGrade = exports.addFactGen = exports.updateFact = exports.addFact = exports.getFactsByTestId = exports.getFactsByRolesId = exports.getFact = void 0;

var _connectDB = require("../connectDB.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//get specific rows from Question table using a test type id and the soldier sereial id that can be found in the params of the request. then send only those rows to the client
var getFact = function getFact(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

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
  } catch (_unused) {
    console.log("bad token");
  }
};

exports.getFact = getFact;

var getFactsByRolesId = function getFactsByRolesId(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var rid = req.params.rid;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    var sqlGet = "SELECT * FROM fact WHERE role=$1 AND  date BETWEEN $2 AND $3;";

    _connectDB.db.query(sqlGet, [rid, lastDay, firstDay], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }

      res.send(result.rows);
    });
  } catch (_unused2) {
    console.log("bad token");
  }
};

exports.getFactsByRolesId = getFactsByRolesId;

var getFactsByTestId = function getFactsByTestId(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var ttid = req.params.ttid;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    var sqlGet = "SELECT * FROM fact WHERE test_type_id=$1 AND  date BETWEEN $2 AND $3;";

    _connectDB.db.query(sqlGet, [ttid, lastDay, firstDay], function (err, result) {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }

      res.send(result.rows);
    });
  } catch (_unused3) {
    console.log("bad token");
  }
}; //add new fact to table.


exports.getFactsByTestId = getFactsByTestId;

var addFact = function addFact(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var soldier_serial_id = req.body[0];
    var test_type_id = req.body[1];
    var role = req.body[2];
    var date = req.body[3];
    var questions = req.body[4]; //is array of the questions

    var scores = req.body[5]; //is array

    var parent_external_id = req.body[6]; //null for now- will be battalion number of soldier

    var comments = req.body[7]; //is array
    //const chosenSoldiers=  req.body[8];//this will be an array of soldiers for a תרגיל צוות

    for (var i = 0; i < scores.length; i++) {
      var sqlInsert = "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id, comment) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";

      _connectDB.db.query(sqlInsert, [soldier_serial_id, test_type_id, role, date, questions[i].id, typeof scores[i] == "string" ? scores[i] === "true" ? 1 : 0 : scores[i], //if boolean then 1 for true, 0 for false, else just input the number
      parent_external_id, comments[i]], function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(200).send("wrote to table");
  } catch (_unused4) {
    console.log("bad token");
  }
}; //update a fact by its id


exports.addFact = addFact;

var updateFact = function updateFact(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.headers.token, "9809502");

    var facts = req.body[0];
    var comments = req.body[1];
    var date = req.body[2];
    var sqlUpdateTrans = "UPDATE Fact SET date=$1, score=$2, comment=$3 WHERE id = $4";
    facts.map(function (fact, ind) {
      _connectDB.db.query(sqlUpdateTrans, [date, typeof fact.score == "string" ? fact.score === "true" ? 1 : 0 : fact.score, comments[ind], fact.id], function (err, result) {
        if (err) console.log(err);
      });
    });
    res.sendStatus(200);
  } catch (_unused5) {
    console.log("bad token");
  }
}; //add facts to table from general mashad nput.


exports.updateFact = updateFact;

var addFactGen = function addFactGen(req, res) {
  try {
    var firstDay;
    var lastDay;

    (function () {
      _jsonwebtoken["default"].verify(req.headers.token, "9809502");

      var completedArray = req.body[0];
      var ttid = req.body[1];
      var rid = req.body[2];
      firstDay = new Date();
      firstDay.setDate(firstDay.getDate() + 5);
      firstDay = firstDay.toISOString().slice(0, 10);
      lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 5);
      lastDay = lastDay.toISOString().slice(0, 10);
      var sqlInsert = "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES($1,$2,$3,$4,$5,$6,$7)";
      var sqlGet = "SELECT * FROM fact WHERE soldier_serial_id=$1 AND question_id=$2 AND  date BETWEEN $3 AND $4;";
      var sqlUpdate = "UPDATE Fact SET date=$1, score=$2 WHERE id = $3";

      var _loop = function _loop() {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            keyQuestion = _Object$entries$_i[0],
            valQuestion = _Object$entries$_i[1];

        var _loop2 = function _loop2() {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              keySol = _Object$entries2$_i[0],
              valueAns = _Object$entries2$_i[1];

          _connectDB.db.query(sqlGet, [keySol.toString(), keyQuestion, lastDay, firstDay], function (err, result) {
            if (err) console.log(err);

            if (result.rowCount === 0) {
              console.log(keySol, "no prev");

              _connectDB.db.query(sqlInsert, [keySol, ttid, rid, new Date().toISOString().slice(0, 10), keyQuestion, typeof valueAns == "boolean" ? valueAns ? 1 : 0 : valueAns, null], function (err, result) {
                if (err) {
                  console.log(err);
                }
              });
            } else {
              console.log(keySol, "hasprev");

              _connectDB.db.query(sqlUpdate, [new Date().toISOString().slice(0, 10), typeof valueAns == "boolean" ? valueAns ? 1 : 0 : valueAns, result.rows[0].id], function (err, result) {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        };

        for (var _i2 = 0, _Object$entries2 = Object.entries(valQuestion); _i2 < _Object$entries2.length; _i2++) {
          _loop2();
        }
      };

      for (var _i = 0, _Object$entries = Object.entries(completedArray); _i < _Object$entries.length; _i++) {
        _loop();
      }

      res.status(200).send("wrote to table");
      sendEmails();
    })();
  } catch (_unused6) {
    console.log("bad token");
  }
}; //calculate the final grade for the training


exports.addFactGen = addFactGen;

var calcFinalFactGrade = function calcFinalFactGrade(req, res) {
  try {
    _jsonwebtoken["default"].verify(req.body.headers.token, "9809502");

    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    var sqlGet = "SELECT * FROM fact WHERE date BETWEEN $1 AND $2;";
    var soldierArray = [];

    _connectDB.db.query(sqlGet, [firstDay, lastDay], function (err, result) {
      result.rows.map(function (fact) {
        if (!soldierArray.includes(fact.soldier_serial_id)) {
          soldierArray.push(fact.soldier_serial_id);
        }
      }); //get facts for each sodier

      var soldiersFacts = {};
      soldierArray.map(function (soldierId) {
        soldiersFacts[soldierId] = result.rows.filter(function (fact) {
          return fact.soldier_serial_id === soldierId;
        });
      });
      var finalGradeObg = {};

      for (var _i3 = 0, _Object$entries3 = Object.entries(soldiersFacts); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
            solId = _Object$entries3$_i[0],
            solFacts = _Object$entries3$_i[1];

        calculateAndUpdate(solId, solFacts, finalGradeObg);
      }

      if (err) console.log(err);
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    console.log("bad token");
  }
};

exports.calcFinalFactGrade = calcFinalFactGrade;

var calculateAndUpdate = function calculateAndUpdate(solId, solFacts, finalGradeObg) {
  var testFactObj = {};
  var testFactIdArr = [];
  finalGradeObg[solId] = 0;
  solFacts.map(function (fact) {
    if (!testFactIdArr.includes(fact.test_type_id)) testFactIdArr.push(fact.test_type_id);
  });
  testFactIdArr.map(function (ttid) {
    testFactObj[ttid] = solFacts.filter(function (fact) {
      return fact.test_type_id === ttid;
    });
  });

  for (var _i4 = 0, _Object$entries4 = Object.entries(testFactObj); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        ttid = _Object$entries4$_i[0],
        factsArr = _Object$entries4$_i[1];

    // console.log(calculate(factsArr, ttid,finalGradeObg,solId));
    calculate(factsArr, ttid, finalGradeObg, solId);
  } // console.log(finalGradeObg);

};

var calculate = function calculate(factsArr, ttid, finalGradeObg, solId) {
  var len;
  return regeneratorRuntime.async(function calculate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          len = factsArr.length;
          factsArr.map(function _callee2(fact, ind) {
            var sqlGet;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    sqlGet = "SELECT weight,input_type FROM question WHERE id=$1;";
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(_connectDB.db.query(sqlGet, [fact.question_id], function _callee(err, result) {
                      var weight, percent, firstDay, lastDay, sqlUpdateTrans;
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              weight = parseFloat(result.rows[0].weight);

                              if (weight != 0) {
                                percent = 0;

                                if (result.rows[0].input_type === "open-numeric") {
                                  percent = fact.score / 100;
                                  finalGradeObg[solId] += weight * percent;
                                } else if (result.rows[0].input_type === "numeric") {
                                  percent = fact.score / 10;
                                  finalGradeObg[solId] += weight * percent;
                                }
                              }

                              if (!(ind === len - 1)) {
                                _context.next = 13;
                                break;
                              }

                              //we got to the end of calculating the grade for a specifick test- so we update the score.
                              //at the end each fact will have a final score of the soldier
                              console.log(finalGradeObg[solId], solId);
                              firstDay = new Date();
                              firstDay.setDate(firstDay.getDate() - 5);
                              firstDay = firstDay.toISOString().slice(0, 10);
                              lastDay = new Date();
                              lastDay.setDate(lastDay.getDate() + 5);
                              lastDay = lastDay.toISOString().slice(0, 10);
                              sqlUpdateTrans = "UPDATE Fact SET final_grade=$1 WHERE soldier_serial_id = $2 AND date BETWEEN $3 AND $4";
                              _context.next = 13;
                              return regeneratorRuntime.awrap(_connectDB.db.query(sqlUpdateTrans, [finalGradeObg[solId], solId, firstDay, lastDay], function (err, result) {
                                if (err) console.log(err);
                              }));

                            case 13:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    }));

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //function to send emails to the trainees at the end of training


var sendEmails = function sendEmails() {};