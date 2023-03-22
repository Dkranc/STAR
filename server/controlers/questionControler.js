import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

//get specific rows from Question table using a test type id that can be found in the params of the request. then send only those rows to the client
export const getQuestionsByTestTypeId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { ttid } = req.params;

    const sqlGet = "SELECT * FROM question WHERE test_type_id=$1";
    db.query(sqlGet, [ttid], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

//get specific rows from Question table using a parent id .
export const getQuestionsByParentId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { pid } = req.params;
    const sqlGet = "SELECT * FROM question WHERE parent_id=$1";
    db.query(sqlGet, [pid], (err, result) => {
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
