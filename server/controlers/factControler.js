import { db } from "../connectDB.js";

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
        typeof(scores[i]) == "string" ? (scores[i] ? 1 : 0 ) : scores[i], //if boolean then 1 for true, 0 for false, else just input the number
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
  const { fid } = req.params;
  const {
    soldier_serial_id,
    test_type_id,
    role,
    date,
    question_id,
    score,
    parent_external_id,
  } = req.body;
  const sqlUpdateTrans =
    "UPDATE Fact SET soldier_serial_id=$1, test_type_id=$2, role=$3, date=$4, question_id=$5, score=$6, parent_external_id=$7 WHERE id = $8";
  db.query(
    sqlUpdateTrans,
    [
      soldier_serial_id,
      test_type_id,
      role,
      date,
      question_id,
      score,
      parent_external_id,
      fid,
    ],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
};
