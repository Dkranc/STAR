import { db } from "../connectDB.js";

//get  the soldiers from the Soldier table according to their  battalion id
export const getSoldiersByBatId = (req, res) => {
  const { bid } = req.params;
  const sqlGet = "SELECT * FROM Soldier WHERE battalion_id=?";
  db.query(sqlGet, [bid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get  the soldiers from the Soldier table according to their  company id
export const getSoldiersByCompId = (req, res) => {
  const { cid } = req.params;
  const sqlGet = "SELECT * FROM Soldier WHERE company_id=?";
  db.query(sqlGet, [cid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get  the soldiers from the Soldier table according to their  department id
export const getSoldiersByDepId = (req, res) => {
  const { did } = req.params;
  const sqlGet = "SELECT * FROM Soldier WHERE department_id=?";
  db.query(sqlGet, [did], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get specific row from Soldier table using a sid that can be found in the params of the request. then send only that row to the client
export const getSoldiersById = (req, res) => {
  const { sid } = req.params;
  const sqlGet = "SELECT * FROM Soldier WHERE id= (?);";
  db.query(sqlGet, [sid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//add new soldier to table.
export const addSoldier = (req, res) => {
  const {
    serial_id,
    full_name,
    department_id,
    company_id,
    battalion_id,
    position_id,
    is_reserve,
    email,
  } = req.body;
  const sqlInsert =
    "INSERT INTO Soldier(serial_id, full_name, department_id, company_id, battalion_id, position_id, is_reserve,email,final_grade) VALUES(?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      serial_id,
      full_name,
      department_id,
      company_id,
      battalion_id,
      position_id,
      is_reserve,
      email,
      final_grade,
    ],
    (err, result) => {
      if (err) console.log(err);
    }
  );
};

//update a soldier by its id
export const updateSoldierById = (req, res) => {
  const { sid } = req.params;
  const {
    serial_id,
    full_name,
    department_id,
    company_id,
    battalion_id,
    position_id,
    is_reserve,
    email,
    final_grade,
  } = req.body;
  const sqlUpdateTrans =
    "UPDATE Soldier SET serial_id=?, full_name=?, department_id=?, company_id=?, battalion_id=?, position_id=?, is_reserve=? ,email=?, final_grade WHERE id = ?";
  db.query(
    sqlUpdateTrans,
    [
      serial_id,
      full_name,
      department_id,
      company_id,
      battalion_id,
      position_id,
      is_reserve,
      email,
      final_grade,
      sid,
    ],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
};
