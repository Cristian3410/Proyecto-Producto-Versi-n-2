
//queries de registro

export const findUserExistUsers = "SELECT * FROM usuarios WHERE username = ?";

export const findUserExistEmployee = "SELECT * FROM empleados WHERE cedula = ? OR correo = ? OR telefono = ? ";
 
export const insertNewUserDataBase = "INSERT INTO usuarios(username, password, rol) VALUES (?,?,?) ";

export const insertNewEmployee = "INSERT INTO empleados (usuario_id,cedula,nombres,apellidos,telefono,correo,edad,cargo)VALUES(?,?,?,?,?,?,?,?)";

//queries de logueo

export const userExist = "SELECT * FROM  usuarios WHERE username = ? "

export const passwordExist = "SELECT * FROM usuarios WHERE password = ?"


//queries de verificacion token

export  const findTokenUser = "SELECT * FROM usuarios WHERE username = ?";

//queries de visualizacion de horarios



//queries para registar id en tablas de hora de entrada y salida


export const InsertScheduleId = "INSERT INTO registros_asistencia (empleado_id) VALUES (?)"

export const insertEntryTime = "UPDATE registros_asistencia SET hora_entrada = ? , fecha = ? WHERE empleado_id = ?"

export const insertExitTime = "UPDATE registros_asistencia SET hora_salida = ?  WHERE empleado_id = ? "

//queries para registrar id en tablas de horarios

export const iDInShifts = "INSERT INTO horarios (empleado_id) VALUES (?)";

export const consultShifts = "SELECT * FROM horarios WHERE empleado_id = ?"




