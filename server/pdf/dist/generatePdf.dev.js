"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCommanderPdf = exports.sendEmails = exports.generatePdf = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _path2 = _interopRequireDefault(require("path"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _moment = _interopRequireDefault(require("moment"));

var _connectDB = require("../connectDB.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var compile = function compile(templateName, data) {
  var filePth, html;
  return regeneratorRuntime.async(function compile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filePth = _path2["default"].join(process.cwd(), "pdf", "".concat(templateName, ".hbs"));
          _context.next = 3;
          return regeneratorRuntime.awrap(_fsExtra["default"].readFile(filePth, "utf8"));

        case 3:
          html = _context.sent;
          return _context.abrupt("return", _handlebars["default"].compile(html)(data));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

_handlebars["default"].registerHelper("dataFormat", function (value, format) {
  return (0, _moment["default"])(value).format(format);
});

var generatePdf = function generatePdf(soldier) {
  var firstDay, lastDay, sqlGet, sqlGetFacts, data;
  return regeneratorRuntime.async(function generatePdf$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          firstDay = new Date();
          firstDay.setDate(firstDay.getDate() - 5);
          firstDay = firstDay.toISOString().slice(0, 10);
          lastDay = new Date();
          lastDay.setDate(lastDay.getDate() + 5);
          lastDay = lastDay.toISOString().slice(0, 10);
          sqlGet = "SELECT * FROM soldier s JOIN test_type tt  ON tt.role_id = s.role WHERE s.soldier_serial_id=$1;";
          sqlGetFacts = "SELECT *  FROM fact f JOIN question q ON f.question_id=q.id WHERE f.soldier_serial_id=$1 AND f.test_type_id=$2  AND f.date BETWEEN $3 AND $4;";
          data = {
            soldier: soldier,
            soldierRole: soldier.role === 1 ? "מפקד" : soldier.role === 2 ? "טען" : soldier.role === 3 ? "תותחן" : "נהג"
          };

          _connectDB.db.query(sqlGet, [soldier.soldier_serial_id], function _callee2(err, res1) {
            var rows, browser, page, content, sent;
            return regeneratorRuntime.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 3;
                      break;
                    }

                    console.log(err);
                    return _context3.abrupt("return", false);

                  case 3:
                    rows = res1.rows;
                    data.testTypes = rows;
                    rows.forEach(function (testType, ind) {
                      _connectDB.db.query(sqlGetFacts, [soldier.soldier_serial_id, testType.id, firstDay, lastDay], function _callee(err, res2) {
                        var facts;
                        return regeneratorRuntime.async(function _callee$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                if (!err) {
                                  _context2.next = 3;
                                  break;
                                }

                                console.log(err);
                                return _context2.abrupt("return", false);

                              case 3:
                                facts = res2.rows;
                                facts.forEach(function (fact, ind) {
                                  //need to add here calculation for each test by it self
                                  if (fact.input_type === "boolean") {
                                    fact.score = fact.score === 1 ? "V" : "X";
                                  }
                                });
                                testType.facts = facts;
                                data.testTypes[ind] = testType;

                              case 7:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      });
                    });
                    _context3.next = 8;
                    return regeneratorRuntime.awrap(_puppeteer["default"].launch({
                      headless: "new"
                    }));

                  case 8:
                    browser = _context3.sent;
                    _context3.next = 11;
                    return regeneratorRuntime.awrap(browser.newPage());

                  case 11:
                    page = _context3.sent;
                    _context3.next = 14;
                    return regeneratorRuntime.awrap(compile("weekSummary", data));

                  case 14:
                    content = _context3.sent;
                    _context3.next = 17;
                    return regeneratorRuntime.awrap(page.setContent(content));

                  case 17:
                    _context3.next = 19;
                    return regeneratorRuntime.awrap(page.emulateMediaType("screen"));

                  case 19:
                    _context3.next = 21;
                    return regeneratorRuntime.awrap(page.pdf({
                      path: "./pdf/\u05D3\u05D5\u05D7-\u05E1\u05D9\u05DB\u05D5\u05DD-\u05E9\u05D1\u05D5\u05E2".concat(soldier.soldier_serial_id, ".pdf"),
                      format: "A4",
                      printBackground: true,
                      width: "1000px",
                      height: "3000px"
                    }));

                  case 21:
                    console.log("pdf generated");
                    sent = sendEmails(soldier);
                    _context3.next = 25;
                    return regeneratorRuntime.awrap(browser.close());

                  case 25:
                    return _context3.abrupt("return", sent);

                  case 26:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });

          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0); //if error acured we retunr false for sending the email

          return _context4.abrupt("return", false);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; //function to send emails to the trainees at the end of training
//if any error acurs then the function returns false- no send hapeend.


exports.generatePdf = generatePdf;

var sendEmails = function sendEmails(soldier) {
  console.log("sending emails");

  var transporter = _nodemailer["default"].createTransport({
    service: "gmail",
    auth: {
      user: "StarDevHatal@gmail.com",
      pass: "vonyaqorwxtkvonw"
    }
  });

  var mailOptions = {
    from: "StarDevHatal@gmail.com",
    to: soldier.mail,
    subject: "דוח סיכום אימון",
    text: "ראה קובץ מצורף, סיכום אימון כוכב",
    attachments: [{
      filename: "form-doch.pdf",
      path: "../server/pdf/\u05D3\u05D5\u05D7-\u05E1\u05D9\u05DB\u05D5\u05DD-\u05E9\u05D1\u05D5\u05E2".concat(soldier.soldier_serial_id, ".pdf"),
      contentType: "application/pdf"
    }]
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);

      var _path = "../server/pdf/\u05D3\u05D5\u05D7-\u05E1\u05D9\u05DB\u05D5\u05DD-\u05E9\u05D1\u05D5\u05E2".concat(soldier.soldier_serial_id, ".pdf");

      try {
        _fsExtra["default"].unlinkSync(_path); //file removed


        console.log("file removed");
      } catch (err) {
        console.error(err);
      }
    }
  });
  return true;
};

exports.sendEmails = sendEmails;

var generateCommanderPdf = function generateCommanderPdf(commander) {
  var firstDay, lastDay, sqlGetTestTypes, sqlGetFactsByCompany, data, browser, page, content, sent;
  return regeneratorRuntime.async(function generateCommanderPdf$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          firstDay = new Date();
          firstDay.setDate(firstDay.getDate() - 5);
          firstDay = firstDay.toISOString().slice(0, 10);
          lastDay = new Date();
          lastDay.setDate(lastDay.getDate() + 5);
          lastDay = lastDay.toISOString().slice(0, 10);
          sqlGetTestTypes = "SELECT * FROM test_type WHERE is_mashad_test=false;";
          sqlGetFactsByCompany = "SELECT *  FROM fact f JOIN soldier s ON f.soldier_serial_id=s.soldier_serial_id WHERE s.pluga=$1 AND f.date BETWEEN $2 AND $3;";
          data = {
            soldier: soldier,
            soldierRole: "מפ"
          };

          _connectDB.db.query(sqlGetTestTypes, function _callee4(err1, res1) {
            return regeneratorRuntime.async(function _callee4$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _connectDB.db.query(sqlGetFactsByCompany, [commander.pluga, firstDay, lastDay], function _callee3(err2, res2) {
                      return regeneratorRuntime.async(function _callee3$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      });
                    });

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });

          _context7.next = 13;
          return regeneratorRuntime.awrap(_puppeteer["default"].launch({
            headless: "new"
          }));

        case 13:
          browser = _context7.sent;
          _context7.next = 16;
          return regeneratorRuntime.awrap(browser.newPage());

        case 16:
          page = _context7.sent;
          _context7.next = 19;
          return regeneratorRuntime.awrap(compile("weekSummaryMP", data));

        case 19:
          content = _context7.sent;
          _context7.next = 22;
          return regeneratorRuntime.awrap(page.setContent(content));

        case 22:
          _context7.next = 24;
          return regeneratorRuntime.awrap(page.emulateMediaType("screen"));

        case 24:
          _context7.next = 26;
          return regeneratorRuntime.awrap(page.pdf({
            path: "./pdf/\u05D3\u05D5\u05D7-\u05E1\u05D9\u05DB\u05D5\u05DD-\u05E9\u05D1\u05D5\u05E2".concat(commander.soldier_serial_id, ".pdf"),
            format: "A4",
            printBackground: true,
            width: "1000px",
            height: "3000px"
          }));

        case 26:
          console.log("pdf generated");
          sent = sendEmails(commander);
          _context7.next = 30;
          return regeneratorRuntime.awrap(browser.close());

        case 30:
          return _context7.abrupt("return", sent);

        case 33:
          _context7.prev = 33;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0); //if error acured we retunr false for sending the email

          return _context7.abrupt("return", false);

        case 37:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 33]]);
};

exports.generateCommanderPdf = generateCommanderPdf;