import { Router } from 'express'
import { crearUsuario, login, setRol } from '../controllers/user.controller.js'
import { verifyToken, verifyAdmin } from '../middlewares/auth.js'

const router = Router()

// Quedan: /api/user/crearUsuario, /api/user/login, /api/user/setRol
router.post('/crearUsuario', crearUsuario)
router.post('/login', login)
router.post('/setRol', verifyToken, verifyAdmin, setRol)

export default router

