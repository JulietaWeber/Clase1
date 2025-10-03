import { executeQuery } from '../services/db.js'

export async function registrarEscucha(req, res) {
  const { idCancion } = req.body
  const { id: usuarioId } = req.user

  if (!idCancion) {
    return res.status(400).json({ message: 'Debe enviar idCancion' })
  }

  try {
    await executeQuery(
      `INSERT INTO escucha (usuarioid, cancionid, reproducciones)
       VALUES ($1, $2, 1)
       ON CONFLICT (usuarioid, cancionid)
       DO UPDATE SET reproducciones = escucha.reproducciones + 1`,
      [usuarioId, idCancion]
    )
    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error('Error al registrar escucha:', error)
    if (String(error?.message || '').includes('foreign key')) {
      return res.status(400).json({ message: 'La canción no existe' })
    }
    return res.status(500).json({ message: 'Error al registrar escucha' })
  }
}


