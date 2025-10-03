import { Router } from 'express'
import { crearCancion, actualizarCancion, borrarCancion } from '../controllers/cancion.controller.js'
import { verifyToken, verifyAdmin } from '../middlewares/auth.js'

const router = Router()

// Quedan: POST/PUT/DELETE /api/cancion
router.post('/', verifyToken, verifyAdmin, crearCancion)
router.put('/', verifyToken, verifyAdmin, actualizarCancion)
router.delete('/', verifyToken, verifyAdmin, borrarCancion)

export default router
