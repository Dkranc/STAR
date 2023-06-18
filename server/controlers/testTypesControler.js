import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

//get   test type by id
export const getTestTypesById = (req, res) => {
  try {
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
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

//get  all the test types
export const getTestTypes = (req, res) => {
  try {
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
    const sqlGet = "SELECT * FROM test_type;";
    db.query(sqlGet, (err, result) => {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMashadTestsById = (req, res) => {
  try {
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
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
