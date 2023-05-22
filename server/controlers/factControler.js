import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

//get specific rows from Question table using a test type id and the soldier sereial id that can be found in the params of the request. then send only those rows to the client
export const getFact = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { ssid, ttid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const sqlGet =
      "SELECT * FROM fact WHERE soldier_serial_id=$1 AND test_type_id=$2 AND  date BETWEEN $3 AND $4;";
    db.query(sqlGet, [ssid, ttid, lastDay, firstDay], (err, result) => {
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

export const getFactsByRolesId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { rid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const sqlGet =
      "SELECT * FROM fact WHERE role=$1 AND  date BETWEEN $2 AND $3;";
    db.query(sqlGet, [rid, lastDay, firstDay], (err, result) => {
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

export const getFactsByTestId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { ttid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const sqlGet =
      "SELECT * FROM fact WHERE test_type_id=$1 AND  date BETWEEN $2 AND $3;";
    db.query(sqlGet, [ttid, lastDay, firstDay], (err, result) => {
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

export const getFactsByQuestionId = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const { qid } = req.params;
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);

    const sqlGet =
      "SELECT *,s.id FROM fact f INNER JOIN soldier s ON CAST(f.soldier_serial_id AS INTEGER) = s.soldier_serial_id WHERE f.question_id=$1 AND  f.date BETWEEN $2 AND $3;";
    db.query(sqlGet, [qid, lastDay, firstDay], (err, result) => {
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

//add new fact to table.
export const addFact = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const soldier_serial_id = req.body[0];
    const test_type_id = req.body[1];
    const role = req.body[2];
    const date = req.body[3];
    const questions = req.body[4]; //is array of the questions
    const scores = req.body[5]; //is array
    const parent_external_id = req.body[6]; //null for now- will be battalion number of soldier
    const comments = req.body[7]; //is array
    //const chosenSoldiers=  req.body[8];//this will be an array of soldiers for a תרגיל צוות

    for (let i = 0; i < scores.length; i++) {
      const sqlInsert =
        "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id, comment) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
      db.query(
        sqlInsert,
        [
          soldier_serial_id,
          test_type_id,
          role,
          date,
          questions[i].id,
          typeof scores[i] == "string"
            ? scores[i] === "true"
              ? 1
              : 0
            : scores[i], //if boolean then 1 for true, 0 for false, else just input the number
          parent_external_id,
          comments[i],
        ],

        (err, result) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(200).send("wrote to table");
  } catch {
    console.log("bad token");
  }
};

//update a fact by its id
export const updateFact = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const facts = req.body[0];
    const comments = req.body[1];
    const date = req.body[2];

    const sqlUpdateTrans =
      "UPDATE Fact SET date=$1, score=$2, comment=$3 WHERE id = $4";

    facts.map((fact, ind) => {
      db.query(
        sqlUpdateTrans,
        [
          date,
          typeof fact.score == "string"
            ? fact.score === "true"
              ? 1
              : 0
            : fact.score,
          comments[ind],
          fact.id,
        ],
        (err, result) => {
          if (err) console.log(err);
        }
      );
    });
    res.sendStatus(200);
  } catch {
    console.log("bad token");
  }
};

//add fact info for med test
export const addFactGenMed = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const soldierAnswers = req.body;
    var date = new Date();
    date = date.toISOString().slice(0, 10);
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 5);
    lastDay = lastDay.toISOString().slice(0, 10);
    const parent_external_id = null;
    const selectSoldierQuery =
      "SELECT role,soldier_serial_id from soldier WHERE id=$1;";
    const selectQuestionJoinTestType = `SELECT * FROM test_type tt  INNER JOIN question q ON q.test_type_id = tt.id
       WHERE q.name='מערים' AND tt.role_id=$1;`;

    const sqlSelectFactIfExists =
      "SELECT * FROM fact WHERE soldier_serial_id=$1 AND question_id=$2 AND date BETWEEN $3 AND $4;";
    const sqlUpdateIfExists = "UPDATE fact SET date=$1, score=$2 WHERE id = $3";
    const sqlInsert =
      "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES($1,$2,$3,$4,$5,$6,$7)";

    for (const [solId, value] of Object.entries(soldierAnswers)) {
      db.query(selectSoldierQuery, [solId], (err, result) => {
        if (err) console.log(err);
        const role = result.rows[0].role;
        const soldierSerialId = result.rows[0].soldier_serial_id;
        db.query(selectQuestionJoinTestType, [role], (er, res2) => {
          if (res2.rows.length == 0) {
          }

          if (res2.rows.length != 0) {
            db.query(
              sqlSelectFactIfExists,
              [soldierSerialId, res2.rows[0].id, firstDay, lastDay],
              (err, resEx) => {
                if (resEx.rows.length != 0) {
                  db.query(
                    sqlUpdateIfExists,
                    [date, value === true ? 1 : 0, resEx.rows[0].id],
                    (err, res4) => {
                      if (err) console.log(err);
                    }
                  );
                } else {
                  db.query(
                    sqlInsert,
                    [
                      soldierSerialId,
                      res2.rows[0].test_type_id,
                      role,
                      date,
                      res2.rows[0].id,
                      value === true ? 1 : 0, //if boolean then 1 for true, 0 for false
                      parent_external_id,
                    ],

                    (error, res3) => {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                }
              }
            );
          }
        });
      });
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

//add facts to table from general mashad nput.
export const addFactGen = (req, res) => {
  try {
    jwt.verify(req.headers.token, "9809502");
    const completedArray = req.body[0];
    const ttid = req.body[1];
    const rid = req.body[2];

    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 5);
    lastDay = lastDay.toISOString().slice(0, 10);

    const sqlInsert =
      "INSERT INTO fact(soldier_serial_id, test_type_id, role, date, question_id, score, parent_external_id) VALUES($1,$2,$3,$4,$5,$6,$7)";

    const sqlGet =
      "SELECT * FROM fact WHERE soldier_serial_id=$1 AND question_id=$2 AND  date BETWEEN $3 AND $4;";

    const sqlUpdate = "UPDATE Fact SET date=$1, score=$2 WHERE id = $3";

    for (const [keyQuestion, valQuestion] of Object.entries(completedArray)) {
      for (const [keySol, valueAns] of Object.entries(valQuestion)) {
        db.query(
          sqlGet,
          [keySol.toString(), keyQuestion, lastDay, firstDay],
          (err, result) => {
            if (err) console.log(err);

            if (result.rowCount === 0) {
              db.query(
                sqlInsert,
                [
                  keySol,
                  ttid,
                  rid,
                  new Date().toISOString().slice(0, 10),
                  keyQuestion,
                  typeof valueAns == "boolean" ? (valueAns ? 1 : 0) : valueAns,
                  null,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            } else {
              db.query(
                sqlUpdate,
                [
                  new Date().toISOString().slice(0, 10),
                  typeof valueAns == "boolean" ? (valueAns ? 1 : 0) : valueAns,
                  result.rows[0].id,
                ],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      }
    }

    res.status(200).send("wrote to table");
  } catch {
    console.log("bad token");
  }
};

//calculate the final grade for the training
export const calcFinalFactGrade = (req, res) => {
  try {
    jwt.verify(req.body.headers.token, "9809502");

    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 5);
    lastDay = lastDay.toISOString().slice(0, 10);

    const sqlGet = "SELECT * FROM fact WHERE date BETWEEN $1 AND $2;";
    var soldierArray = [];

    db.query(sqlGet, [firstDay, lastDay], (err, result) => {
      result.rows.map((fact) => {
        if (!soldierArray.includes(fact.soldier_serial_id)) {
          soldierArray.push(fact.soldier_serial_id);
        }
      });

      //get facts for each sodier
      var soldiersFacts = {};
      soldierArray.map((soldierId) => {
        soldiersFacts[soldierId] = result.rows.filter(
          (fact) => fact.soldier_serial_id === soldierId
        );
      });

      let finalGradeObg = {};
      for (const [solId, solFacts] of Object.entries(soldiersFacts)) {
        calculateAndUpdate(solId, solFacts, finalGradeObg);
      }

      if (err) console.log(err);
    });
    sendEmails();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    console.log("bad token");
  }
};

const calculateAndUpdate = (solId, solFacts, finalGradeObg) => {
  var testFactObj = {};
  var testFactIdArr = [];

  finalGradeObg[solId] = 0;

  solFacts.map((fact) => {
    if (!testFactIdArr.includes(fact.test_type_id))
      testFactIdArr.push(fact.test_type_id);
  });

  testFactIdArr.map((ttid) => {
    testFactObj[ttid] = solFacts.filter((fact) => fact.test_type_id === ttid);
  });

  for (const [ttid, factsArr] of Object.entries(testFactObj)) {
    // console.log(calculate(factsArr, ttid,finalGradeObg,solId));
    calculate(factsArr, ttid, finalGradeObg, solId);
  }
  // console.log(finalGradeObg);
};

const calculate = async (factsArr, ttid, finalGradeObg, solId) => {
  const len = factsArr.length;

  factsArr.map(async (fact, ind) => {
    const sqlGet =
      "SELECT * FROM question q INNER JOIN test_type tt ON q.test_type_id = tt.id  WHERE q.id=$1;";

    await db.query(sqlGet, [fact.question_id], async (err, result) => {
      var weight = parseFloat(result.rows[0].weight);
      const role = fact.role;
      const teamTestId = 2;
      if (weight != 0) {
        //the team test is worth a diferent amoubt for each role
        if (teamTestId === result.rows[0].test_type_id && role !== 1) {
          weight = 1.8181; // need to fix this with new scores and wegihts
        }
        var percent = 0;
        if (result.rows[0].input_type === "open-numeric") {
          percent = fact.score / 100;
          finalGradeObg[solId] += weight * percent;
        } else if (result.rows[0].input_type === "numeric") {
          percent = fact.score / 10;
          finalGradeObg[solId] += weight * percent;
        }
      }

      //now that we have the wegiht and score we can calculate the final grade and update the fact scores.

      var firstDay = new Date();
      firstDay.setDate(firstDay.getDate() - 5);
      firstDay = firstDay.toISOString().slice(0, 10);
      var lastDay = new Date();
      lastDay.setDate(lastDay.getDate() + 5);
      lastDay = lastDay.toISOString().slice(0, 10);

      const sqlUpdateTrans =
        "UPDATE Fact SET final_grade=$1 WHERE soldier_serial_id = $2 AND date BETWEEN $3 AND $4";

      await db.query(
        sqlUpdateTrans,
        [finalGradeObg[solId], solId, firstDay, lastDay],
        (err, result) => {
          if (err) console.log(err);
        }
      );
    });
  });
};

//function to send emails to the trainees at the end of training
//need to get files and send them!!!!
//will be in new controller!!
const sendEmails = () => {
  console.log("sending emails");

  const soldier_serial_id = 42;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "StarDevHatal@gmail.com",
      pass: "vonyaqorwxtkvonw",
    },
  });

  var mailOptions = {
    from: "dvdkranc22@gmail.com",
    to: "dvdkranc22@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy! wow!!",
    attachments: [
      {
        filename: "form-doch.pdf",
        path: `../server/pdf/דוח-סיכום-שבוע${soldier_serial_id}.pdf`,
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
