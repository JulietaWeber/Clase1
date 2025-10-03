import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { registrarEscucha, obtenerEscuchas } from '../controllers/escucha.controller.js'

const router = Router()

router.post('/escucho', verifyToken, registrarEscucha) // POST /api/escucho
router.get('/escucho', verifyToken, obtenerEscuchas)   // GET  /api/escucho

export default router
