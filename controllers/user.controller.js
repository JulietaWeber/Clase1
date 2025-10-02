
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { executeQuery } from "../services/dbServices.js";

export async function crearUsuario(req, res) {
  const { nombre, password } = req.body;
  console.log("crearUsuario body:", { nombre, password });

  if (!nombre || !password) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await executeQuery(
      "INSERT INTO usuario (nombre, password, rol) VALUES ($1, $2, $3) RETURNING id, nombre, rol",
      [nombre, hashedPassword, "Usuario"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    if (error.code === "23505") {
      return res.status(409).json({ message: "Usuario ya existe" });
    }
    return res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { nombre, password } = req.body;
  console.log("login body:", { nombre, password });

  if (!nombre || !password) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  try {
    const result = await executeQuery(
      "SELECT * FROM usuario WHERE nombre = $1",
      [nombre]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const dbUser = result.rows[0];

    const ok = await bcrypt.compare(password, dbUser.password);
    if (!ok) {
      return res.status(401).json({ message: "Clave inválida" });
    }

    const payload = { id: dbUser.id, nombre: dbUser.nombre, rol: dbUser.rol };
    const token = jwt.sign(payload, "contraseña", { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: error.message });
  }
}

export async function setRol(req, res) {
  const { idUsuario, rol } = req.body;
  console.log("setRol body:", { idUsuario, rol });

  if (!idUsuario || !rol) {
    return res.status(400).json({ message: "Debe completar todos los campos" });
  }

  if (rol !== "Admin" && rol !== "Usuario") {
    return res.status(400).json({ message: "Rol inválido" });
  }

  try {
    const result = await executeQuery(
      "UPDATE usuario SET rol = $1 WHERE id = $2 RETURNING id, nombre, rol",
      [rol, idUsuario]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error en setRol:", error);
    return res.status(500).json({ message: error.message });
  }
}
