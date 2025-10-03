// db.js
import 'dotenv/config'           // <-- para leer .env
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // <-- leer, NO asignar
  ssl: { rejectUnauthorized: false }          // con Neon + sslmode=require
})

export async function executeQuery(text, params) {
  const client = await pool.connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}


