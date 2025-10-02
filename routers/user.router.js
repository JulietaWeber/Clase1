import { Router } from "express";
import { crearUsuario, login, setRol } from "../controllers/user.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/user/crearUsuario", crearUsuario);
router.post("/user/login", login);
router.post("/user/setRol", verifyToken, verifyAdmin, setRol);

export default router;



