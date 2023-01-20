import { db } from "../connectDB.js";

//get  the departments from the Department table according to their  battalion id
export const getDepartmentsByBatId = (req, res) => {
  const { bid } = req.params;
  const sqlGet = "SELECT * FROM Department WHERE battalion_id=?";
  db.query(sqlGet, [bid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get  the departments from the Department table according to their  company id
export const getDepartmentsByCompId = (req, res) => {
  const { cid } = req.params;
  const sqlGet = "SELECT * FROM Department WHERE company_id=?";
  db.query(sqlGet, [cid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get specific row from department table using a Did that can be found in the params of the request. then send only that row to the client
export const getDepartmentById = (req, res) => {
  const { did } = req.params;
  const sqlGet = "SELECT * FROM Department WHERE id= (?);";
  db.query(sqlGet, [did], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//add new department to table.
export const addDepartment = (req, res) => {
  const { battalion_id, company_id, name } = req.body;
  const sqlInsert =
    "INSERT INTO Department(battalion_id, company_id, name) VALUES(?,?,?)";
  db.query(sqlInsert, [battalion_id, company_id, name], (err, result) => {
    if (err) console.log(err);
  });
};

//update a department by its id
export const updateDepartmentById = (req, res) => {
  const { did } = req.params;
  const { battalion_id, company_id, name } = req.body;
  const sqlUpdateTrans =
    "UPDATE Department SET battalion_id=?, company_id=?, name=? WHERE id = ?";
  db.query(
    sqlUpdateTrans,
    [battalion_id, company_id, name, did],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
};
