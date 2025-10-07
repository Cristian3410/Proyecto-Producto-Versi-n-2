import pool from "../database/config.js";
import { insertEntryTime, insertExitTime, consultShifts } from "../database/queries.js";
import bcrypt from "bcryptjs"

export const viewSchedule = async (req, res) => {
  const { username, userId } = req.user;

  const ahora = new Date();

  const ahoraEntrada = ahora.toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const fecha = ahora.toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
  }).split("/").reverse().join("-"); 

  await pool.query(insertEntryTime, [ahoraEntrada, fecha, userId]);

  return res.status(200).json({
    message: "Hora de entrada registrada correctamente",
    horaEntrada: ahoraEntrada,
    fecha,
  });
};


export const registerCheckOutTime = async (req, res) => {
  const { username, userId } = req.user;

  const ahora = new Date();

  const ahoraSalida = ahora.toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  await pool.query(insertExitTime, [ahoraSalida, userId]);

  return res.status(200).json({
    message: "Hora de salida registrada correctamente",
    horaSalida: ahoraSalida,
  });
};


export const ViewShifts = async (req, res) => {
  try {
    const { userId } = req.user; // viene del token, es usuarios.id

    // 1️⃣ Obtener el id del empleado
    const [empleadoRows] = await pool.query(
      "SELECT id FROM empleados WHERE usuario_id = ?",
      [userId]
    );

    if (empleadoRows.length === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    const empleadoId = empleadoRows[0].id;

    // 2️⃣ Traer los horarios del empleado
    const [horarios] = await pool.query(
      "SELECT * FROM horarios WHERE empleado_id = ?",
      [empleadoId]
    );

    return res.status(200).json(horarios);
  } catch (error) {
    console.error("Error al traer los horarios:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};



export const changePassword = async (req, res) => {
  try {
    const { contrasenaAntigua, nuevaContrasena } = req.body;
    const { username } = req.user;

    // 1. Buscar usuario
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    console.log("contraseña antigua enviada:", contrasenaAntigua);
    console.log("contraseña en DB:", usuario.password);

    // 2. Comparar contraseña antigua con la encriptada en DB
    const validarPass = await bcrypt.compare(contrasenaAntigua, usuario.password);

    if (!validarPass) {
      return res.status(401).json({ message: "La contraseña actual no es correcta" });
    }

    // 3. Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

    // 4. Guardar en DB
    await pool.query(
      "UPDATE usuarios SET password = ? WHERE username = ?",
      [hashedPassword, username]
    );

    res.json({ message: "Contraseña cambiada con éxito" });
  } catch (error) {
    console.error("Error en changePassword:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
