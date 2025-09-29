import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import db from "../service/user.service"
dotenv.config()
const crearUsuario = async(req, res)=>{
    const{idUsuario, nombre, password}= req.body
    const hash = await bcrypt.hash(password, 10)
    try{
        await db.crearUsuario(idUsuario, nombre, password)
        res.status(201).send("Usuario creado")
    }
    catch{
        res.status(500).send("Error bebeeeeee")
    }
}