import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

//get  all the test types (only four- static)
export const getTestTypesById = (req, res) => {
  try {
    console.log(req.headers.token);
    jwt.verify(req.headers.token, "9809502");
    const { rrid } = req.params;
    const sqlGet =
      "SELECT * FROM test_type WHERE role_id= $1 AND is_mashad_test= false";
    db.query(sqlGet, [rrid], (err, result) => {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMashadTestsById = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { rrid } = req.params;
    const sqlGet =
      "SELECT * FROM test_type WHERE role_id= $1 AND is_mashad_test= true";
    db.query(sqlGet, [rrid], (err, result) => {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};
