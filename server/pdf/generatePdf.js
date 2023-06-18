import puppeteer from "puppeteer";
import fs from "fs-extra";
import nodemailer from "nodemailer";
import path from "path";
import hbs from "handlebars";
import moment from "moment";
import { db } from "../connectDB.js";

const compile = async (templateName, data) => {
  const filePth = path.join(process.cwd(), "pdf", `${templateName}.hbs`);
  const html = await fs.readFile(filePth, "utf8");
  return hbs.compile(html)(data);
};

hbs.registerHelper("dataFormat", (value, format) => {
  return moment(value).format(format);
});

export const generatePdf = async (soldier) => {
  try {
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 5);
    lastDay = lastDay.toISOString().slice(0, 10);

    const sqlGet =
      "SELECT * FROM soldier s JOIN test_type tt  ON tt.role_id = s.role WHERE s.soldier_serial_id=$1;";

    const sqlGetFacts =
      "SELECT *  FROM fact f JOIN question q ON f.question_id=q.id WHERE f.soldier_serial_id=$1 AND f.test_type_id=$2  AND f.date BETWEEN $3 AND $4;";

    let data = {
      soldier: soldier,
      soldierRole:
        soldier.role === 1
          ? "מפקד"
          : soldier.role === 2
          ? "טען"
          : soldier.role === 3
          ? "תותחן"
          : "נהג",
    };
    db.query(sqlGet, [soldier.soldier_serial_id], async (err, res1) => {
      if (err) {
        console.log(err);
        return false;
      }

      let rows = res1.rows;
      data.testTypes = rows;
      rows.forEach((testType, ind) => {
        db.query(
          sqlGetFacts,
          [soldier.soldier_serial_id, testType.id, firstDay, lastDay],
          async (err, res2) => {
            if (err) {
              console.log(err);
              return false;
            }

            let facts = res2.rows;
            facts.forEach((fact, ind) => {
              //TODO: need to add here calculation for each test by it self
              if (fact.input_type === "boolean") {
                fact.score = fact.score === 1 ? "V" : "X";
              }
            });
            testType.facts = facts;
            data.testTypes[ind] = testType;
          }
        );
      });

      const browser = await puppeteer.launch({ headless: "new" });
      const page = await browser.newPage();

      const content = await compile("weekSummary", data);
      await page.setContent(content);
      await page.emulateMediaType("screen");
      await page.pdf({
        path: `./pdf/דוח-סיכום-שבוע${soldier.soldier_serial_id}.pdf`,
        format: "A4",
        printBackground: true,
        width: "1000px",
        height: "3000px",
      });

      console.log("pdf generated", page);

      const sent = sendEmails(soldier);
      await browser.close();
      return sent;
    });
  } catch (err) {
    console.log(err);
    //if error acured we retunr false for sending the email
    return false;
  }
};

//function to send emails to the trainees at the end of training
//if any error acurs then the function returns false- no send hapeend.
export const sendEmails = (soldier) => {
  console.log("sending emails");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "StarDevHatal@gmail.com",
      pass: "vonyaqorwxtkvonw",
    },
  });

  var mailOptions = {
    from: "StarDevHatal@gmail.com",
    to: soldier.mail,
    subject: "דוח סיכום אימון",
    text: "ראה קובץ מצורף, סיכום אימון כוכב",
    attachments: [
      {
        filename: "form-doch.pdf",
        path: `../server/pdf/דוח-סיכום-שבוע${soldier.soldier_serial_id}.pdf`,
        contentType: "application/pdf",
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);

      const path = `../server/pdf/דוח-סיכום-שבוע${soldier.soldier_serial_id}.pdf`;

      try {
        fs.unlinkSync(path);
        //file removed
        console.log("file removed");
      } catch (err) {
        console.error(err);
      }
    }
  });
  return true;
};

export const generateCommanderPdf = async (commander, soldierArray) => {
  try {
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 5);
    firstDay = firstDay.toISOString().slice(0, 10);
    var lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 5);
    lastDay = lastDay.toISOString().slice(0, 10);

    const sqlGetTestTypes =
      "SELECT * FROM test_type WHERE is_mashad_test=false;";

    const sqlGetFacts =
      "SELECT * FROM (SELECT *  FROM fact f JOIN soldier s ON f.soldier_serial_id::INTEGER=s.soldier_serial_id WHERE f.test_type_id=$1 AND f.soldier_serial_id=$2 AND s.pluga=$3 AND f.date BETWEEN $4 AND $5) t JOIN question q ON t.question_id=q.id;";

    let data = {
      soldier: commander,
      soldierRole: "מפ",
      roles: [
        {
          number: 1,
          name: "מפקד",
          tests: [],
        },
        {
          number: 2,
          name: "תותחן",
          tests: [],
        },
        {
          number: 3,
          name: "טען",
          tests: [],
        },
        {
          number: 4,
          name: "נהג",
          tests: [],
        },
      ],
    };

    db.query(sqlGetTestTypes, async (err1, res1) => {
      const testTypes = res1.rows;

      testTypes.forEach((testType, ind) => {
        data.roles[parseInt(testType.role_id) - 1].tests.push({
          id: testType.id,
          name: testType.name,
          scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      });

      const testTypesLength = testTypes.length;
      const soldierLength = soldierArray.length;
      testTypes.forEach((testType, ttid) => {
        soldierArray.map((soldier, sid) => {
          db.query(
            sqlGetFacts,
            [
              testType.id,
              soldier.soldier_serial_id,
              commander.pluga,
              firstDay,
              lastDay,
            ],
            async (err2, res2) => {
              if (err2) {
                console.log("err2:", err2);
                return false;
              } else {
                //calculate the test score and add it to the appropriate test type score array

                var score = calcSPecificTestTypeScore(res2.rows); //score will be between 0 and 10 to know where the score shpuld go in the array.

                if (score === 10) score = 9;
                var test = data.roles[
                  parseInt(testType.role_id) - 1
                ].tests.find((test) => test.id === testType.id);

                if (soldier.role === testType.role_id) {
                  test.scores[score]++; // only add score if the right role
                }

                if (ttid === testTypesLength - 1 && sid === soldierLength - 1) {
                  const browser = await puppeteer.launch({ headless: "new" });
                  const page = await browser.newPage();

                  const content = await compile("weekSummaryMP", data);
                  await page.setContent(content);
                  await page.emulateMediaType("screen");
                  await page.pdf({
                    path: `./pdf/דוח-סיכום-שבוע${commander.soldier_serial_id}.pdf`,
                    format: "A4",
                    printBackground: true,
                    width: "1000px",
                    height: "3000px",
                  });

                  console.log("pdf generated");

                  const sent = sendEmails(commander);
                  await browser.close();
                  return sent;
                }
              }
            }
          );
        });
      });
    });
  } catch (err) {
    console.log(err);
    //if error acured we retunr false for sending the email
    return false;
  }
};

const calcSPecificTestTypeScore = (testTypeFacts) => {
  if (testTypeFacts.length === 0) return 0;
  else {
    var score = 0;
    var maxScore = 0;

    testTypeFacts.map((fact) => {
      var weight = parseFloat(fact.weight);
      const role = fact.role;
      const teamTestId = 2;
      if (weight != 0) {
        //the team test is worth a diferent amoubt for each role
        if (teamTestId === fact.test_type_id && role !== 1) {
          weight = 1.8181; // this  is the score for all the rest of the roles for this test type.
        }
        var percent = 0;
        if (fact.input_type === "open-numeric") {
          percent = fact.score / 100;
          score += weight * percent;
          maxScore += weight;
        } else if (fact.input_type === "numeric") {
          percent = fact.score / 10;
          score += weight * percent;
          maxScore += weight;
        }
      }
    });
    return Math.round(((score / maxScore) * 100) / 10);
  }
};
