import { db } from "../connectDB.js";

//get  all the test types (only four- static)
export const getTestTypes = (req, res) => {
  const sqlGet = "SELECT * FROM Test_Type;";
  db.query(sqlGet, (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};
