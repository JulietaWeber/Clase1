
import { Router } from "express";
import { crearUsuario, login, setRol } from "../controllers/user.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js"; 

const router = Router();

// Crear usuario (registro)
router.post("/user/crearUsuario", crearUsuario);

// Login (devuelve token)
router.post("/user/login", login);

// Asignar rol (solo admin)
router.post("/user/setRol", verifyToken, verifyAdmin, setRol);

export default router;

