import { Router } from "express";
import { registrarEscucha, obtenerEscuchas } from "../controllers/escucha.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

router.post("/escucho", verifyToken, registrarEscucha);
router.get("/escucho", verifyToken, obtenerEscuchas);

export default router;
