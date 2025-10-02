import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { executeQuery } from "../services/db.js";


// POST /user/crearUsuario
// Body: { idUsuario, nombre, password }
export async function crearUsuario(req, res) {
  const { idUsuario, nombre, password } = req.body;

  if (!idUsuario || !nombre || !password) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  try {
    // ¿existe id?
    const exist = await executeQuery(
      "SELECT id FROM usuario WHERE id = $1",
      [idUsuario]
    );
    if (exist.rowCount > 0) {
      return res.status(409).json({ message: "Usuario ya existe" });
    }

    const hash = await bcrypt.hash(password, 10);

    const r = await executeQuery(
      "INSERT INTO usuario (id, nombre, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, rol",
      [idUsuario, nombre, hash, "Usuario"]
    );

    return res.status(201).json(r.rows[0]);
  } catch (e) {
    console.error("Error al registrar usuario:", e);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
}

// POST /user/login
// Body: { nombre, password }  -> { token }
export async function login(req, res) {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  try {
    const r = await executeQuery(
      "SELECT id, nombre, password, rol FROM usuario WHERE nombre = $1",
      [nombre]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Clave inválida" });
    }

    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, rol: user.rol },
      "contraseña",
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (e) {
    console.error("Error en login:", e);
    return res.status(500).json({ message: "Error en login" });
  }
}

// POST /user/setRol   (solo Admin)
// Body: { idUsuario, rol }  // rol: "Admin" | "Usuario"
export async function setRol(req, res) {
  const { idUsuario, rol } = req.body;

  if (!idUsuario || !rol) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }
  if (rol !== "Admin" && rol !== "Usuario") {
    return res.status(400).json({ message: "Rol inválido" });
  }

  try {
    const r = await executeQuery(
      "UPDATE usuario SET rol = $1 WHERE id = $2 RETURNING id, nombre, rol",
      [rol, idUsuario]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(r.rows[0]);
  } catch (e) {
    console.error("Error en setRol:", e);
    return res.status(500).json({ message: "Error al asignar rol" });
  }
}

