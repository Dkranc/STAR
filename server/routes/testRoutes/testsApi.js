import express from "express";
import {
  getTestTypesById,
  getMashadTestsById,
  getTestTypes,
} from "../../controlers/testTypesControler.js";
import {
  getQuestionsByTestTypeId,
  getQuestionsByParentId,
} from "../../controlers/questionControler.js";
import {
  addFact,
  addFactGen,
  addFactGenMed,
  updateFact,
  getFact,
  getFactsByTestId,
  getFactsByRolesId,
  calcFinalFactGrade
} from "../../controlers/factControler.js";

const router = express.Router();

/** TEST_TYPE */
//get  test type by id
router.get("/test_types/:rrid", getTestTypesById);
//get all test types
router.get("/test_types/", getTestTypes);

//get all test types for mashad
router.get("/test_types/mashad/:rrid", getMashadTestsById);

/** Question */
//get all questions with specific test type id
router.get("/question/:ttid", getQuestionsByTestTypeId);
//get all questions with specific parent id
router.get("/question/:ttid", getQuestionsByParentId);

/** Fact */
// get a fact by soldier serial id  and test type id
router.get("/fact/:ssid/:ttid", getFact);
// get a facts by roleId
router.get("/fact/rid/rid/:rid", getFactsByRolesId);
// get facts by test type id
router.get("/fact/:ttid", getFactsByTestId);
//add a fact
router.post("/fact", addFact);
//add a general input for mashad test
router.post("/fact/generalInput", addFactGen);
//add a general input for mashad test
router.post("/fact/medicalGeneralInput", addFactGenMed);
//update facts
router.post("/fact/update", updateFact);
//calculate grade for all facts
router.put("/fact/calcFinalGrade", calcFinalFactGrade);

export default router;
