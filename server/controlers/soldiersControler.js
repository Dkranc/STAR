import { request } from "express";
import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

//get soldiers by week number
export const getSoldiersByTrainingWeek = (req, res) => {
  try {
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
    const tid = req.params.tid;

    const sqlGet = "SELECT * FROM soldier WHERE week_number = $1";
    db.query(sqlGet, [tid], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(402).json(err);
      }
      res.send(result.rows);
    });
  } catch {
    console.log("bad token");
  }
};

//get all soldiers from table
export const getSoldiers = (req, res) => {
  try {
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));

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
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
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
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
    const serial_id = req.body[0];
    const first_name = req.body[1];
    const last_name = req.body[2];
    const pluga = req.body[3];
    const role = req.body[4];
    const week_number = req.body[5];
    const mail = req.body[6];

    const sqlInsert =
      "INSERT INTO Soldier(soldier_serial_id, first_name, pluga, parent_external_id, mail, role, last_name, week_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
    db.query(
      sqlInsert,
      [serial_id, first_name, pluga, 0, mail, role, last_name, week_number],
      (err, result) => {
        if (err) console.log(err);
        else {
          res.send(result);
        }
      }
    );
  } catch {
    console.log("bad token");
  }
};

//update a soldier by its id
export const updateSoldierById = (req, res) => {
  try {
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));
    const { sid } = req.params;
    const serial_id = req.body[0];
    const first_name = req.body[1];
    const last_name = req.body[2];
    const pluga = req.body[3];
    const role = req.body[4];
    const week_number = req.body[5];
    const mail = req.body[6];
    const sqlUpdateTrans =
      "UPDATE Soldier SET soldier_serial_id=$1, first_name=$2, pluga=$3,  parent_external_id=$4,  mail=$5, role=$6, last_name=$7, week_number=$8  WHERE id = $9";
    db.query(
      sqlUpdateTrans,
      [
        serial_id,
        first_name,
        pluga,
        0,
        mail,
        role,
        last_name,
        week_number,
        sid,
      ],
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
    jwt.verify(req.headers.token, String(process.env.JWT_TOKEN));

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
