import cliente from "../db.js"
cliente.connect();
const crearUsuario = async(idUsuario, nombre, password)=>{
    const query = await cliente.query('INSERT INTO "Usuario" (id, nombre, password) VALUES ($1, $2, $3)',[idUsuario, nombre, password])
return
}


export default {
    crearUsuario
}