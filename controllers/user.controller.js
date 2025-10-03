import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { executeQuery } from '../services/db.js'

// POST /crearusuario
// Body: { idUsuario, nombre, password }
export async function crearUsuario(req, res) {
  const { idUsuario, nombre, password } = req.body
  if (!idUsuario || !nombre || !password) {
    return res.status(400).json({ message: 'Debe completar todos los campos' })
  }
  try {
    const exists = await executeQuery('SELECT 1 FROM usuario WHERE id=$1', [idUsuario])
    if (exists.rowCount > 0) {
      return res.status(409).json({ message: 'El id de usuario ya existe' })
    }
    const hash = await bcrypt.hash(password, 10)
    const r = await executeQuery(
      'INSERT INTO usuario (id, nombre, password) VALUES ($1, $2, $3) RETURNING id, nombre, rol',
      [idUsuario, nombre, hash]
    )
    return res.status(201).json(r.rows[0])
  } catch (e) {
    console.error('Error en crearUsuario:', e)
    return res.status(500).json({ message: 'Error al crear usuario' })
  }
}

// POST /login
// Body: { idUsuario, password }
export async function login(req, res) {
  const { idUsuario, password } = req.body
  if (!idUsuario || !password) {
    return res.status(400).json({ message: 'Debe enviar idUsuario y password' })
  }
  try {
    const r = await executeQuery('SELECT id, nombre, password, rol FROM usuario WHERE id=$1', [idUsuario])
    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no existe' })
    }
    const user = r.rows[0]
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Password incorrecto' })
    }
    const payload = { id: user.id, nombre: user.nombre, rol: user.rol }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' })
    return res.json({ token, user: payload })
  } catch (e) {
    console.error('Error en login:', e)
    return res.status(500).json({ message: 'Error en login' })
  }
}

// POST /api/user/setRol  (Admin)
// Body: { idUsuario, rol }  // 'Admin' | 'Usuario'
export async function setRol(req, res) {
  const { idUsuario, rol } = req.body
  if (!idUsuario || !rol || !['Admin', 'Usuario'].includes(rol)) {
    return res.status(400).json({ message: 'Debe enviar idUsuario y rol válido (Admin/Usuario)' })
  }
  try {
    const r = await executeQuery(
      'UPDATE usuario SET rol=$1 WHERE id=$2 RETURNING id, nombre, rol',
      [rol, idUsuario]
    )
    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.json(r.rows[0])
  } catch (e) {
    console.error('Error en setRol:', e)
    return res.status(500).json({ message: 'Error al asignar rol' })
  }
}
