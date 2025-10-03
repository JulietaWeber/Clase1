import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRouter from './routes/user.router.js'
import cancionRouter from './routes/cancion.router.js'
import escuchaRouter from './routes/escucha.router.js'

const app = express()
app.use(cors())
app.use(express.json())

// Rutas "formales" con prefijo
app.use('/api/user', userRouter)
app.use('/api/cancion', cancionRouter)
app.use('/api', escuchaRouter) // contiene /escucho GET y POST

// Aliases literales para cumplir la consigna
import { crearUsuario, login } from './controllers/user.controller.js'
import { verifyToken } from './middlewares/auth.js'
import { obtenerEscuchas } from './controllers/escucha.controller.js'

app.post('/crearusuario', crearUsuario)
app.post('/login', login)
app.get('/escucho', verifyToken, obtenerEscuchas)

// Salud
app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'API TP Auth & Escuchas' })
})

export default app
