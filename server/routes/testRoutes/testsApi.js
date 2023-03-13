import express from "express";
import {
  getTestTypesById,
  getMashadTestsById,
} from "../../controlers/testTypesControler.js";
import {
  getQuestionsByTestTypeId,
  getQuestionsByParentId,
} from "../../controlers/questionControler.js";
import {
  addFact,
  addFactGen,
  updateFact,
  getFact,
  getFactsByTestId,
} from "../../controlers/factControler.js";

const router = express.Router();

/** TEST_TYPE */
//get all test types
router.get("/test_types/:rrid", getTestTypesById);

//get all test types for mashad
router.get("/test_types/mashad/:rrid", getMashadTestsById);

/** Question */
//get all questions with specific test type id
router.get("/question/:ttid", getQuestionsByTestTypeId);
//get all questions with specific parent id
router.get("/question/:ttid", getQuestionsByParentId);

/** Fact */
// get a fact by soldier serial id
router.get("/fact/:ssid/:ttid", getFact);
// get facts by test type id
router.get("/fact/:ttid", getFactsByTestId);
//add a fact
router.post("/fact", addFact);
//add a general input for mashad test
router.post("/fact/generalInput", addFactGen);
//update facts
router.post("/fact/update", updateFact);

export default router;
