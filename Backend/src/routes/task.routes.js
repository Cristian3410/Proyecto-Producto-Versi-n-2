import { Router } from "express";
import {viewSchedule,registerCheckOutTime,ViewShifts,changePassword} from "../controllers/taskControllers.js"
import { accessRequired } from "../middlewares/validatorToken.js";

const router = Router();


router.post("/registroEntrada",accessRequired,viewSchedule)

router.post("/registroSalida",accessRequired,registerCheckOutTime)

router.post("/ConsultarHorarios",accessRequired,ViewShifts)

router.post("/cambiarContrasena",accessRequired,changePassword)
 


export default router 