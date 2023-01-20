import { db } from "../connectDB.js";

//get  all the trainings
export const getTrainings = (req, res) => {
  const sqlGet = "SELECT * FROM Training;";
  db.query(sqlGet, (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//get specific row from Training table using a sid that can be found in the params of the request. then send only that row to the client
export const getTrainingById = (req, res) => {
  const { tid } = req.params;
  const sqlGet = "SELECT * FROM Training WHERE id= (?);";
  db.query(sqlGet, [tid], (err, result) => {
    if (err) return res.status(402).json(err);
    res.send(result.rows);
  });
};

//add new training to table.
export const addTraining = (req, res) => {
  const { battalion_id, start_date, end_date } = req.body;
  const sqlInsert =
    "INSERT INTO Training(battalion_id, start_date, end_date) VALUES(?,?,?)";
  db.query(sqlInsert, [battalion_id, start_date, end_date], (err, result) => {
    if (err) console.log(err);
  });
};

//update a training by its id
export const updateTrainingById = (req, res) => {
  const { tid } = req.params;
  const { battalion_id, start_date, end_date } = req.body;
  const sqlUpdateTrans =
    "UPDATE Training SET battalion_id =?, start_date=? , end_date=? WHERE id = ?";
  db.query(
    sqlUpdateTrans,
    [battalion_id, start_date, end_date, tid],
    (err, result) => {
      if (err) console.log(err);
      res.send(result);
    }
  );
};
