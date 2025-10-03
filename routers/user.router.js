import { Router } from 'express'
import { crearUsuario, login, setRol } from '../controllers/user.controller.js'
import { verifyToken, verifyAdmin } from '../middlewares/auth.js'

const router = Router()

router.post('/crearUsuario', crearUsuario)
router.post('/login', login)
router.post('/setRol', verifyToken, verifyAdmin, setRol)

export default router
