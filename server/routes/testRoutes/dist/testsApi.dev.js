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
//get  test type by id


router.get("/test_types/:rrid", _testTypesControler.getTestTypesById); //get all test types

router.get("/test_types/", _testTypesControler.getTestTypes); //get all test types for mashad

router.get("/test_types/mashad/:rrid", _testTypesControler.getMashadTestsById);
/** Question */
//get all questions with specific test type id

router.get("/question/:ttid", _questionControler.getQuestionsByTestTypeId); //get all questions with specific parent id

router.get("/question/:ttid", _questionControler.getQuestionsByParentId);
/** Fact */
// get a fact by soldier serial id  and test type id

router.get("/fact/:ssid/:ttid", _factControler.getFact); // get a facts by roleId

router.get("/fact/rid/rid/:rid", _factControler.getFactsByRolesId); //get facts by question id

router.get("/fact/questionId/qid/:qid", _factControler.getFactsByQuestionId); // get facts by test type id

router.get("/fact/:ttid", _factControler.getFactsByTestId); //add a fact

router.post("/fact", _factControler.addFact); //add a general input for mashad test

router.post("/fact/generalInput", _factControler.addFactGen); //add a general input for mashad test

router.post("/fact/medicalGeneralInput", _factControler.addFactGenMed); //update facts

router.post("/fact/update", _factControler.updateFact); //calculate grade for all facts

router.put("/fact/calcFinalGrade", _factControler.calcFinalFactGrade);
var _default = router;
exports["default"] = _default;