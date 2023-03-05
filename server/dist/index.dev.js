"use strict";

var _genApi = _interopRequireDefault(require("./routes/generalRoutes/genApi.js"));

var _testsApi = _interopRequireDefault(require("./routes/testRoutes/testsApi.js"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//get server from express
var app = (0, _express["default"])(); //middleware

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use("/api/general", _genApi["default"]);
app.use("/api/tests", _testsApi["default"]); //start sever on port 8080

app.listen(8080, function () {
  console.log("server started on port 8080");
});