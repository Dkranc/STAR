import express from "express";
import { getTestTypesById } from "../../controlers/testTypesControler.js";
import { getQuestionsByTestTypeId } from "../../controlers/questionControler.js";
import { addFact, updateFact } from "../../controlers/factControler.js";


const router = express.Router();


/** TEST_TYPE */
//get all test types
router.get("/test_types/:rrid",  getTestTypesById);

/** Question */
//get all questions with specific test type id 
router.get("/question/:ttid",  getQuestionsByTestTypeId);

/** Fact */
//add a fact
router.post("/fact", addFact);
//update fact by id
router.put("/fact/:fid", updateFact);





export default router;