import { db } from "../connectDB.js";

//get  all the test types (only four- static)
export const getTestTypesById = (req, res) => {
  const { rrid } = req.params;
  const sqlGet = 'SELECT * FROM test_type WHERE role_id= $1';
  db.query(sqlGet,[rrid], (err ,result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};
