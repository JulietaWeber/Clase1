// index.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// 👇 OJO: carpeta correcta es "routers" (plural)
import userRouter from './routers/user.router.js'
import cancionRouter from './routers/cancion.router.js'
import escuchaRouter from './routers/escucha.router.js'

import { crearUsuario, login } from './controllers/user.controller.js'
import { verifyToken } from './middlewares/auth.js'
import { obtenerEscuchas } from './controllers/escucha.controller.js'

const app = express()
app.use(cors())
app.use(express.json())

// Prefijos "formales"
app.use('/api/user', userRouter)        // /api/user/crearUsuario | /login | /setRol
app.use('/api/cancion', cancionRouter)  // /api/cancion (POST/PUT/DELETE)
app.use('/api', escuchaRouter)          // /api/escucho (GET/POST)

// Alias básicos de consigna
app.post('/crearusuario', crearUsuario)
app.post('/login', login)
app.get('/escucho', verifyToken, obtenerEscuchas)

app.get('/', (_req, res) => res.json({ ok: true, msg: 'API TP Auth & Escuchas' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

export default app

