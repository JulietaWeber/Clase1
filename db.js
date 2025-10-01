import { Client } from "pg";
import dotenv from "dotenv"
dotenv.config()
const env = process.env
const cliente = new Client({
    user: env.PGUSER,
    host: env.PGHOST,
    database: env.PGDATABASE,
    password: env.PGPASSWORD,
    port: 5432,
    ssl: true,
});

export default cliente;