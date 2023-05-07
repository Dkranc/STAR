import { request } from "express";
import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

//get soldiers by week number
export const getSoldiersByTrainingWeek = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const tid = req.params.tid;
    console.log(tid);
    const sqlGet = "SELECT * FROM soldier WHERE week_number = $1";
    db.query(sqlGet, [tid], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

//get all soldiers from table
export const getSoldiers = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");

    const sqlGet = "SELECT * FROM Soldier";
    db.query(sqlGet, (err, result) => {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};
//get specific row from Soldier table using a sid that can be found in the params of the request. then send only that row to the client
export const getSoldiersById = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { sid } = req.params;
    const sqlGet = "SELECT * FROM Soldier WHERE id= $1";
    db.query(sqlGet, [sid], (err, result) => {
      if (err) return res.status(402).json(err);
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

//add new soldier to table.
export const addSoldier = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const serial_id = req.body[0];
    const full_name = req.body[1];
    const company = req.body[2];
    console.log(req.body);
    const sqlInsert =
      "INSERT INTO Soldier(serial_id, full_name, company) VALUES($1,$2,$3)";
    db.query(sqlInsert, [serial_id, full_name, company], (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    });
  } catch {
    console.log("bad token");
  }
};

//update a soldier by its id
export const updateSoldierById = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { sid } = req.params;
    const serial_id = req.body[0];
    const full_name = req.body[1];
    const company = req.body[2];
    const sqlUpdateTrans =
      "UPDATE Soldier SET serial_id=$1, full_name=$2, company=$3 WHERE id = $4";
    db.query(
      sqlUpdateTrans,
      [serial_id, full_name, company, sid],
      (err, result) => {
        if (err) console.log(err);
        res.send(result);
      }
    );
  } catch {
    console.log("bad token");
  }
};

//update a soldier by its id
export const updateSoldiersCompanyInfo = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");

    const soldiers = req.body[0];

    const sqlUpdate = "UPDATE Soldier SET company=$1 WHERE serial_id = $2";
    for (const [company, soldierList] of Object.entries(soldiers)) {
      for (const [soldier_serial_id, soldierValue] of Object.entries(
        soldierList
      )) {
        if (soldierValue) {
          //only if the solider value is true. else we dont add.
          db.query(
            sqlUpdate,
            [
              company === "1" ? "א" : company === "2" ? "ב" : "ג",
              soldier_serial_id,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              }
            }
          );
        }
      }
    }
    res.status(200).send("updated");
  } catch {
    console.log("bad token");
  }
};
