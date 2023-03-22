import express from "express";
import {
  getSoldiers,
  getSoldiersById,
  addSoldier,
  updateSoldierById,
} from "../../controlers/soldiersControler.js";

import { login } from "../../controlers/loginControler.js";

const router = express.Router();

/*LOGIN*/
//request to set the login data
router.post("/login", login);

/*SOLDIERS*/
//get soldiers by department id
router.get("/soldier/", getSoldiers);
//get soldier by  id
router.get("/soldier/:sid", getSoldiersById);
//add a soldier
router.post("/soldier", addSoldier);
//update soldier by id
router.put("/soldier/:sid", updateSoldierById);

export default router;
