
import { Router } from "express";
import { crearCancion, actualizarCancion, eliminarCancion } from "../controllers/cancion.controller.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = Router();

router.post("/cancion", verifyToken, verifyAdmin, crearCancion);
router.put("/cancion", verifyToken, verifyAdmin, actualizarCancion);
router.delete("/cancion", verifyToken, verifyAdmin, eliminarCancion);

export default router;
