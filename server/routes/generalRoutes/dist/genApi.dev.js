"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _soldiersControler = require("../../controlers/soldiersControler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/*SOLDIERS*/
//get soldiers by department id


router.get("/soldier/", _soldiersControler.getSoldiers); //get soldier by  id

router.get("/soldier/:sid", _soldiersControler.getSoldiersById); //add a soldier

router.post("/soldier", _soldiersControler.addSoldier); //update soldier by id

router.put("/soldier/:sid", _soldiersControler.updateSoldierById);
var _default = router;
exports["default"] = _default;