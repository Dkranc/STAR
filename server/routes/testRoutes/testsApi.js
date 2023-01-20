import express from "express";
import { getTestTypes } from "../../controlers/testTypesControler.js";


const router = express.Router();


/** TEST_TYPE */
//get all test types
router.get("/test_types",  getTestTypes);




export default router;