import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

//get specific rows from Question table using a test type id and the soldier sereial id that can be found in the params of the request. then send only those rows to the client
export const getFact = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { ssid, ttid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const sqlGet =
      "SELECT * FROM fact WHERE soldier_serial_id=$1 AND test_type_id=$2 AND  date BETWEEN $3 AND $4;";
    db.query(sqlGet, [ssid, ttid, lastDay, firstDay], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

export const getFactsByRolesId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { rid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const sqlGet =
      "SELECT * FROM fact WHERE role=$1 AND  date BETWEEN $2 AND $3;";
    db.query(sqlGet, [rid, lastDay, firstDay], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

export const getFactsByTestId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { ttid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const sqlGet =
      "SELECT * FROM fact WHERE test_type_id=$1 AND  date BETWEEN $2 AND $3;";
    db.query(sqlGet, [ttid, lastDay, firstDay], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

//add new fact to table.
export const addFact = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const soldier_serial_id = req.body[0];
    const test_type_id = req.body[1];
    const role = req.body[2];
    const date = req.body[3];
    const questions = req.body[4]; //is array of the questions
    const scores = req.body[5]; //is array
    const parent_external_id = req.body[6]; //null for now- will be battalion number of soldier
    const comments = req.body[7]; //is array

    for (let i = 0; i < scores.length; i++) {
      const sqlInsert =
        "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id, comment) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
      db.query(
        sqlInsert,
        [
          soldier_serial_id,
          test_type_id,
          role,
          date,
          questions[i].id,
          typeof scores[i] == "string"
            ? scores[i] === "true"
              ? 1
              : 0
            : scores[i], //if boolean then 1 for true, 0 for false, else just input the number
          parent_external_id,
          comments[i],
        ],

        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(200).send("wrote to table");
  } catch {
    console.log("bad token");
  }
};

//update a fact by its id
export const updateFact = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const facts = req.body[0];
    const comments = req.body[1];
    const date = req.body[2];

    const sqlUpdateTrans =
      "UPDATE Fact SET date=$1, score=$2, comment=$3 WHERE id = $4";

    facts.map((fact, ind) => {
      db.query(
        sqlUpdateTrans,
        [
          date,
          typeof fact.score == "string"
            ? fact.score === "true"
              ? 1
              : 0
            : fact.score,
          comments[ind],
          fact.id,
        ],
        (err, result) => {
          if (err) console.log(err);
        }
      );
    });
    res.sendStatus(200);
  } catch {
    console.log("bad token");
  }
};

//add facts to table from general mashad nput.
export const addFactGen = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const completedArray = req.body[0];
    const ttid = req.body[1];
    const rid = req.body[2];

    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);

    const sqlInsert =
      "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES($1,$2,$3,$4,$5,$6,$7)";

    const sqlGet =
      "SELECT * FROM fact WHERE soldier_serial_id=$1 AND question_id=$2 AND  date BETWEEN $3 AND $4;";

    const sqlUpdate = "UPDATE Fact SET date=$1, score=$2 WHERE id = $3";

    for (const [keyQuestion, valQuestion] of Object.entries(completedArray)) {
      for (const [keySol, valueAns] of Object.entries(valQuestion)) {
        db.query(
          sqlGet,
          [keySol.toString(), keyQuestion, lastDay, firstDay],
          (err, result) => {
            if (err) console.log(err);

            if (result.rowCount === 0) {
              console.log(keySol, "no prev");
              db.query(
                sqlInsert,
                [
                  keySol,
                  ttid,
                  rid,
                  new Date().toISOString().slice(0, 10),
                  keyQuestion,
                  valueAns ? 1 : 0,
                  null,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            } else {
              console.log(keySol, "hasprev");
              db.query(
                sqlUpdate,
                [
                  new Date().toISOString().slice(0, 10),
                  valueAns ? 1 : 0,
                  result.rows[0].id,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      }
    }
    res.status(200).send("wrote to table");
  } catch {
    console.log("bad token");
  }
};
