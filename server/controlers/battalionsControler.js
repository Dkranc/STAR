import { db } from "../connectDB.js";

//get all the data from the battalion table
export const getBattalions = (req, res) => {
  const sqlGet = "SELECT * FROM Battalion";
  db.query(sqlGet, (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get specific row from battalion table using a bid that can be found in the params of the request. then send only that row to the client
export const getBattalionById = (req, res) => {
  const { bid } = req.params;
  const sqlGet = "SELECT * FROM Battalion WHERE id= (?);";
  db.query(sqlGet, [bid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//add new battalion to table.
export const addBattalion = (req, res) => {
  const { serial_number, name } = req.body;
  const sqlInsert = "INSERT INTO Battalion(serial_number, name) VALUES(?,?)";
  db.query(sqlInsert, [serial_number, name], (err, result) => {
    if (err) console.log(err);
  });
};

//update a battalion by its id
export const updateBattalionById = (req, res) => {
  const { bid } = req.params;
  const { serial_number, name } = req.body;
  const sqlUpdateTrans =
    "UPDATE Battalion SET serial_number=?, name=? WHERE id = ?";
  db.query(sqlUpdateTrans, [serial_number, name, bid], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};
