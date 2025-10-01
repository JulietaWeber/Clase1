import { Router } from "express";
import userController from "../controllers/user.controller.js"
const router = Router()
router.post("/crearUsuario",userController.crearUsuario)
// router.post("/logIn")
export default router
