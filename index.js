import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRouter from './routers/user.router.js'
import cancionRouter from './routers/cancion.router.js'
import escuchaRouter from './routers/escucha.router.js'

import { crearUsuario, login } from './controllers/user.controller.js'
import { verifyToken } from './middlewares/auth.js'
import { obtenerEscuchas } from './controllers/escucha.controller.js'

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/user', userRouter)      
app.use('/api/cancion', cancionRouter)  
app.use('/api', escuchaRouter)          

// Alias básicos de consigna
app.post('/crearusuario', crearUsuario)
app.post('/login', login)
app.get('/escucho', verifyToken, obtenerEscuchas)

app.get('/', (_req, res) => res.json({ ok: true, msg: 'API TP Auth & Escuchas' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

export default app

