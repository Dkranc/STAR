import { db } from "../connectDB.js";

//get  the companies from the Company table according to their  battalion id
export const getCompaniesByBid = (req, res) => {
  const { bid } = req.params;
  const sqlGet = "SELECT * FROM Company WHERE battalion_id=?";
  db.query(sqlGet, [bid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get specific row from company table using a cid that can be found in the params of the request. then send only that row to the client
export const getCompanyById = (req, res) => {
  const { cid } = req.params;
  const sqlGet = "SELECT * FROM Company WHERE id= (?);";
  db.query(sqlGet, [cid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//add new company to table.
export const addCompany = (req, res) => {
  const { battalion_id, name } = req.body;
  const sqlInsert = "INSERT INTO Company(battalion_id, name) VALUES(?,?)";
  db.query(sqlInsert, [battalion_id, name], (err, result) => {
    if (err) console.log(err);
  });
};

//update a company by its id
export const updateCompanyById = (req, res) => {
  const { cid } = req.params;
  const { battalion_id, name } = req.body;
  const sqlUpdateTrans =
    "UPDATE Company SET battalion_id=?, name=? WHERE id = ?";
  db.query(sqlUpdateTrans, [battalion_id, name, cid], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};
