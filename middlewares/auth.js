import jwt from "jsonwebtoken";

// Verifica que venga un token válido en el header "Authorization"
export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "Token requerido" });
  }

  // El header debe ser "Bearer token"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(token, "contraseña"); // mismo secreto que usás en login
    req.user = decoded; // guarda datos del usuario en req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

// Verifica que el usuario tenga rol Admin
export function verifyAdmin(req, res, next) {
  if (!req.user || req.user.rol !== "Admin") {
    return res.status(403).json({ message: "Se requiere rol Admin" });
  }
  next();
}
