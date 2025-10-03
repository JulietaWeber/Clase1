import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' })
  }
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(403).json({ message: 'Formato de token inválido' })
  }
  const token = parts[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

export function verifyAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' })
  }
  if (req.user.rol !== 'Admin') {
    return res.status(403).json({ message: 'Requiere rol Admin' })
  }
  next()
}
