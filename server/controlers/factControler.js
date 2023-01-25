import { db } from "../connectDB.js";

//add new fact to table.
export const addFact = (req, res) => {
  const {
    soldier_serial_id,
    test_type_id,
    role,
    date,
    question_id,
    score,
    parent_external_id,
  } = req.body;
  const sqlInsert =
    "INSERT INTO Fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES(?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      soldier_serial_id,
      test_type_id,
      role,
      date,
      question_id,
      score,
      parent_external_id,
    ],
    (err, result) => {
      if (err) console.log(err);
    }
  );
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
    "UPDATE Fact SET soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id WHERE id = ?";
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
