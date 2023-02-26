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
  updateFact,
  getFact,
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
//add a fact
router.post("/fact", addFact);
//update fact by id
router.put("/fact/:fid", updateFact);

export default router;
