import { executeQuery } from "../services/db.js";


// POST /escucho
export async function registrarEscucha(req, res) {
  const { idCancion } = req.body;
  const user = req.user; // viene del verifyToken

  if (!idCancion) {
    return res.status(400).json({ message: "Debe enviar idCancion" });
  }

  try {
    const r = await executeQuery(
      `INSERT INTO escucha (usuarioid, cancionid, reproducciones)
       VALUES ($1, $2, 1)
       ON CONFLICT (usuarioid, cancionid)
       DO UPDATE SET reproducciones = escucha.reproducciones + 1
       RETURNING id, usuarioid, cancionid, reproducciones`,
      [user.id, idCancion]
    );

    res.status(201).json(r.rows[0]);
  } catch (error) {
    console.error("Error al registrar escucha:", error);
    res.status(500).json({ message: "Error al registrar escucha" });
  }
}

// GET /escucho
export async function obtenerEscuchas(req, res) {
  const user = req.user; // del token

  try {
    const r = await executeQuery(
      `SELECT c.id, c.nombre, e.reproducciones
       FROM escucha e
       JOIN cancion c ON e.cancionid = c.id
       WHERE e.usuarioid = $1`,
      [user.id]
    );

    res.json(r.rows);
  } catch (error) {
    console.error("Error al obtener escuchas:", error);
    res.status(500).json({ message: "Error al obtener escuchas" });
  }
}

