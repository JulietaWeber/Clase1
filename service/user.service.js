/*import cliente from "../db.js"
cliente.connect();
const crearUsuario = async(idUsuario, nombre, password)=>{
    const query = await cliente.query('INSERT INTO "Usuario" (id, nombre, password) VALUES ($1, $2, $3)',[idUsuario, nombre, password])
return
}


export default {
    crearUsuario
}
*/



// services/user.service.js
import cliente from "../db.js";

let connected = false;
if (!connected) {
  await cliente.connect();
  connected = true;
}

/**
 * Inserta usuario con hash y rol por defecto 'Usuario'
 * Recibe el hash ya calculado desde el controller.
 */
const crearUsuario = async (idUsuario, nombre, passwordHash) => {
  await cliente.query(
    'INSERT INTO "Usuario" (id, nombre, password, rol) VALUES ($1, $2, $3, $4)',
    [idUsuario, nombre, passwordHash, "Usuario"]
  );
  // si querés devolver algo:
  // const r = await cliente.query('INSERT ... RETURNING id, nombre, rol', [...])
  // return r.rows[0];
};

const buscarUsuarioPorNombre = async (nombre) => {
  const r = await cliente.query(
    'SELECT id, nombre, password, rol FROM "Usuario" WHERE nombre = $1',
    [nombre]
  );
  return r.rows[0];
};

const buscarUsuarioPorId = async (idUsuario) => {
  const r = await cliente.query(
    'SELECT id, nombre, password, rol FROM "Usuario" WHERE id = $1',
    [idUsuario]
  );
  return r.rows[0];
};

const setRol = async (idUsuario, rol) => {
  const r = await cliente.query(
    'UPDATE "Usuario" SET rol = $1 WHERE id = $2 RETURNING id, nombre, rol',
    [rol, idUsuario]
  );
  return r.rows[0];
};

export default { crearUsuario, buscarUsuarioPorNombre, buscarUsuarioPorId, setRol };
