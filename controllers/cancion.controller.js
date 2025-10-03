import { executeQuery } from '../services/db.js'

export async function crearCancion(req, res) {
  const { nombre } = req.body
  if (!nombre) return res.status(400).json({ message: 'Falta nombre' })
  try {
    const r = await executeQuery('INSERT INTO cancion (nombre) VALUES ($1) RETURNING id, nombre', [nombre])
    res.status(201).json(r.rows[0])
  } catch (e) {
    console.error('crearCancion', e)
    res.status(500).json({ message: 'Error al crear canción' })
  }
}

export async function actualizarCancion(req, res) {
  const { id, nombre } = req.body
  if (!id || !nombre) return res.status(400).json({ message: 'Faltan datos' })
  try {
    const r = await executeQuery('UPDATE cancion SET nombre=$1 WHERE id=$2 RETURNING id, nombre', [nombre, id])
    if (r.rowCount === 0) return res.status(404).json({ message: 'Canción no encontrada' })
    res.json(r.rows[0])
  } catch (e) {
    console.error('actualizarCancion', e)
    res.status(500).json({ message: 'Error al actualizar canción' })
  }
}

export async function borrarCancion(req, res) {
  const { id } = req.body
  if (!id) return res.status(400).json({ message: 'Falta id' })
  try {
    const r = await executeQuery('DELETE FROM cancion WHERE id=$1 RETURNING id', [id])
    if (r.rowCount === 0) return res.status(404).json({ message: 'Canción no encontrada' })
    res.json({ ok: true, id })
  } catch (e) {
    console.error('borrarCancion', e)
    res.status(500).json({ message: 'Error al borrar canción' })
  }
}
