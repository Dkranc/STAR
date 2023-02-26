"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _testTypesControler = require("../../controlers/testTypesControler.js");

var _questionControler = require("../../controlers/questionControler.js");

var _factControler = require("../../controlers/factControler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/** TEST_TYPE */
//get all test types


router.get("/test_types/:rrid", _testTypesControler.getTestTypesById); //get all test types for mashad

router.get("/test_types/mashad/:rrid", _testTypesControler.getMashadTestsById);
/** Question */
//get all questions with specific test type id

router.get("/question/:ttid", _questionControler.getQuestionsByTestTypeId); //get all questions with specific parent id

router.get("/question/:ttid", _questionControler.getQuestionsByParentId);
/** Fact */
// get a fact by soldier serial id

router.get("/fact/:ssid/:ttid", _factControler.getFact); //add a fact

router.post("/fact", _factControler.addFact); //update fact by id

router.put("/fact/:fid", _factControler.updateFact);
var _default = router;
exports["default"] = _default;