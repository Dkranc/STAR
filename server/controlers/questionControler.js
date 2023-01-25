import { db } from "../connectDB.js";

//get specific rows from Question table using a test type id that can be found in the params of the request. then send only those rows to the client
export const getQuestionsByTestTypeId = (req, res) => {
    const { ttid } = req.params;
    const sqlGet = "SELECT * FROM Question WHERE test_type_id= (?);";
    db.query(sqlGet, [ttid], (err, result) => {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  };