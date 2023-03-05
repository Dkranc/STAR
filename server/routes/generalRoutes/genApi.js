import express from "express";
import {
  getSoldiers,
  getSoldiersById,
  addSoldier,
  updateSoldierById,
} from "../../controlers/soldiersControler.js";


const router = express.Router();

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
