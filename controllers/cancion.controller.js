import { executeQuery } from "../services/db.js";


// Crear canción
export async function crearCancion(req, res) {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "Debe enviar un nombre" });
  }

  try {
    const r = await executeQuery(
      "INSERT INTO cancion (nombre) VALUES ($1) RETURNING id, nombre",
      [nombre]
    );
    res.status(201).json(r.rows[0]);
  } catch (error) {
    console.error("Error al crear canción:", error);
    res.status(500).json({ message: "Error al crear canción" });
  }
}

// Actualizar canción
export async function actualizarCancion(req, res) {
  const { id, nombre } = req.body;

  if (!id || !nombre) {
    return res.status(400).json({ message: "Debe enviar id y nombre" });
  }

  try {
    const r = await executeQuery(
      "UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING id, nombre",
      [nombre, id]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    res.json(r.rows[0]);
  } catch (error) {
    console.error("Error al actualizar canción:", error);
    res.status(500).json({ message: "Error al actualizar canción" });
  }
}

// Eliminar canción
export async function eliminarCancion(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Debe enviar id" });
  }

  try {
    const r = await executeQuery(
      "DELETE FROM cancion WHERE id = $1 RETURNING id, nombre",
      [id]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    res.json({ message: "Canción eliminada", cancion: r.rows[0] });
  } catch (error) {
    console.error("Error al eliminar canción:", error);
    res.status(500).json({ message: "Error al eliminar canción" });
  }
}

