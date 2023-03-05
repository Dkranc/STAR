import { db } from "../connectDB.js";

//get specific rows from Question table using a test type id that can be found in the params of the request. then send only those rows to the client
export const getQuestionsByTestTypeId = (req, res) => {
  const { ttid } = req.params;
  const sqlGet = "SELECT * FROM question WHERE test_type_id=$1";
  db.query(sqlGet, [ttid], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(402).json(err);
    }
    res.send(result.rows);
  });
};

//get specific rows from Question table using a parent id .
export const getQuestionsByParentId = (req, res) => {
  const { pid } = req.params;
  const sqlGet = "SELECT * FROM question WHERE parent_id=$1";
  db.query(sqlGet, [pid], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(402).json(err);
    }
    res.send(result.rows);
  });
};
