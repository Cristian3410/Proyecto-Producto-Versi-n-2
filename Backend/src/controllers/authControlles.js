import pool from "../database/config.js";
import {
  findUserExistUsers,
  findUserExistEmployee,
  insertNewUserDataBase,
  insertNewEmployee,
  userExist,
  findTokenUser,
  InsertScheduleId,
  iDInShifts
} from "../database/queries.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/createToken.js";
const TOKEN_SECRET = process.env.TOKEN_SECRET;


export const register = async (req, res) => {
  const {
    identificacion,
    nombres,
    apellidos,
    celular,
    email,
    edad,
    cargo,
    usuario,
    contraseña,
    rol,
  } = req.body;

  const [existingEmployee] = await pool.query(findUserExistEmployee, [
    identificacion,
    email,
    celular,
  ]);

  if (existingEmployee.length > 0) {
    let errores = [];

    const campos = [
      {
        campo: "cedula",
        valor: identificacion,
        mensaje: "el numero de cedula ya se encuentra registrado",
      },
      {
        campo: "correo",
        valor: email,
        mensaje: "el correo electronico ya se encuentra registrado ",
      },
      {
        campo: "telefono",
        valor: celular,
        mensaje: "el numero de telefono ya se encuentra registrado",
      },
    ];

    campos.forEach(({ campo, valor, mensaje }) => {
      const duplicado = existingEmployee.find((user) => user[campo] === valor);

      if (duplicado) {
        errores.push(mensaje);
      }
    });
    return res.status(400).json(errores);
  }

  const [existingUser] = await pool.query(findUserExistUsers, [usuario]);

  if (existingUser.length > 0) {
    return res.status(400).json("el usuario ya se encuentra registrado");
  }

  const passhash = await bcrypt.hash(contraseña, 10);

  const [result] = await pool.query(insertNewUserDataBase, [
    usuario,
    passhash,
    rol,
  ]);

  const idDb = result.insertId;

  const newEmployee = await pool.query(insertNewEmployee, [
    idDb,
    identificacion,
    nombres,
    apellidos,
    celular,
    email,
    edad,
    cargo,
  ]);

  const addScheduleId = await pool.query(InsertScheduleId,[idDb])

  const addiDInShifts = await pool.query(iDInShifts,[idDb])

  const token = await createAccessToken({ username:usuario, userId:idDb});

  res.cookie("token", token);
  console.log(token);
  res
    .status(200)
    .json([
      "El usuario ha sido registrado exitosamente. Por favor, diríjase al inicio de sesión e ingrese utilizando su correo electrónico y la contraseña que ha registrado.",
    ]);
};





export const login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const [verifyUser] = await pool.query(userExist,[usuario]);
    if (!verifyUser.length >0) {
      res
        .status(400)
        .json([
          "credenciales invalidas,valide si ingreso correctamente su correo corporativo o su contraseña",
        ]);
    } else {
      const passHash = verifyUser[0].password;
      const comparePass = await bcrypt.compare(contraseña, passHash);
      if (!comparePass) {
        res
          .status(400)
          .json([
            "credenciales invalidas, valide si ingreso correctamente su correo corporativo o su contraseña",
          ]);
      } else {
        const saveUser = {
          username: verifyUser[0].username,
          id:verifyUser[0].id
        };
        const token = await createAccessToken({ username:saveUser.username,userId:saveUser.id});
        res.cookie("token", token);
        console.log(saveUser);
        console.log(token)
        res.status(200).json(saveUser);
      }
    }
  } catch (error) {
    console.log("se ha producido un error", error);
  }
};




export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false, // pon esto en true si usas HTTPS
    expires: new Date(0),
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Token eliminado con éxito" });
};




export const verify = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json(["no autorizado"]);
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["no autorizado"]);
    const findUser = await pool.query(findTokenUser,[user.username]);
    if (!findUser) return res.status(401).json(["no autorizado"]);
    return res.status(200).json({
      username: findUser[0].username,
    });
  });
};
