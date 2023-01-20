import express from "express";
import { getBattalions ,getBattalionById, addBattalion, updateBattalionById } from "../../controlers/battalionsControler.js";
import { getCompaniesByBid ,getCompanyById, addCompany, updateCompanyById } from "../../controlers/companiesControler.js";
import { getDepartmentsByBatId ,getDepartmentsByCompId, getDepartmentById, addDepartment, updateDepartmentById } from "../../controlers/departmentsControler.js";
import { getSoldiersByBatId ,getSoldiersByCompId, getSoldiersByDepId, getSoldiersById, addSoldier, updateSoldierById } from "../../controlers/soldiersControler.js";
import { getTrainings, getTrainingById, addTraining, updateTrainingById} from "../../controlers/trainingsControler.js";

const router = express.Router();


/* BATTALION*/
//get all battlions
router.get("/battalion", getBattalions);
//get battlion by id
router.get("/battalion/:bid",  getBattalionById);
//add a battlion
router.post("/battalion", addBattalion);
//update battlion by id
router.put("/battalion/:bid",  updateBattalionById);


/*COMPANY*/ 
//get all companies from specific battalion id
router.get("/company/batid/:bid", getCompaniesByBid);
//get company by id
router.get("/company/:cid",  getCompanyById);
//add a company
router.post("/company", addCompany);
//update company by id
router.put("/company/:cid",  updateCompanyById);


/*DEPARTMENT*/
//get all departments from specific battalion id
router.get("/department/batid/:bid", getDepartmentsByBatId);
//get department by company id
router.get("/department/compid/:cid",  getDepartmentsByCompId);
//get department by  id
router.get("/department/:did",  getDepartmentById);
//add a department
router.post("/company", addDepartment);
//update department by id
router.put("/department/:did",  updateDepartmentById);


/*SOLDIERS*/
//get all soldiers by battlion id
router.get("/soldier/batid/:bid", getSoldiersByBatId);
// get all soldiers by company id
router.get("/soldier/compid/:cid",  getSoldiersByCompId);
//get soldiers by department id
router.get("/soldier/depid/:did",  getSoldiersByDepId);
//get soldier by  id
router.get("/soldier/:sid",  getSoldiersById);
//add a soldier
router.post("/soldier", addSoldier);
//update soldier by id
router.put("/soldier/:sid", updateSoldierById);


/* TRIANING*/
//get all Trainings
router.get("/training", getTrainings);
//get soldier by  id
router.get("/training/:tid",  getTrainingById);
//add a soldier
router.post("/training", addTraining);
//update soldier by id
router.put("/training/:tid", updateTrainingById);





export default router;