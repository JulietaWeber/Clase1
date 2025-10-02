
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

export async function executeQuery(query, params = []) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // necesario para Neon
  });

  try {
    await client.connect();
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    console.error("Error en executeQuery:", error);
    throw error;
  } finally {
    await client.end();
  }
}

