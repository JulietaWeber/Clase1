import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { registrarEscucha, obtenerEscuchas } from '../controllers/escucha.controller.js'

const router = Router()

// Quedan: POST/GET /api/escucho
router.post('/escucho', verifyToken, registrarEscucha)
router.get('/escucho', verifyToken, obtenerEscuchas)

export default router
