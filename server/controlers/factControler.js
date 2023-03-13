import { db } from "../connectDB.js";

//get specific rows from Question table using a test type id and the soldier sereial id that can be found in the params of the request. then send only those rows to the client
export const getFact = (req, res) => {
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
};

export const getFactsByTestId = (req, res) => {
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
};

//add new fact to table.
export const addFact = (req, res) => {
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
};

//update a fact by its id
export const updateFact = (req, res) => {
  const facts = req.body[0];
  const comments = req.body[1];
  const date = req.body[2];

  const sqlUpdateTrans =
    "UPDATE Fact SET date=$1, score=$2, comment=$3 WHERE id = $4";

  facts.map((fact, ind) => {
    console.log(typeof fact.score);
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
};

//add facts to table from general mashad nput.
export const addFactGen = (req, res) => {
  const completedArray = req.body[0];
  const ttid = req.body[1];
  const rid = req.body[2];

  const sqlInsert =
    "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES($1,$2,$3,$4,$5,$6,$7)";

  for (const [keyQuestion, valQuestion] of Object.entries(completedArray)) {
    for (const [keySol, valueAns] of Object.entries(valQuestion)) {
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
    }
  }
  res.status(200).send("wrote to table");
};
