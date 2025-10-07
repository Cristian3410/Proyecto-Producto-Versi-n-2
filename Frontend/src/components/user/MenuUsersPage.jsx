import styles from "../user/User.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  horaDeEntradaFechaPost,
  horaDeSalidaPost,
  validarHorariosPost,
  cerrarSesion,
  cambioContrasena
} from "../../api/task.js";
import { useForm } from "react-hook-form"
import { useAuthContext } from "../../contexts/AuthContext.jsx";


function MenuUsersPage() {
  const [mensaje, setMensaje] = useState("");
  const [salida, setSalida] = useState("");
  const [horarios, setHorarios] = useState([]);
    const { logout } = useAuthContext(); 
  const navigate = useNavigate(); 
  const {register,handleSubmit:handle2} = useForm()
  const [mostrarForm,setMostrarform] =useState(false)
  const [mensajePass, setMensajePass] = useState(""); 

  const handleSubmit = async () => {
    const res = await horaDeEntradaFechaPost();
    console.log(res.data);
    setMensaje(res.data);
     setSalida("");      
     setHorarios([]);
      setMostrarform(false)
  };

  const handleSubmitExit = async () => {

     const confirmar = window.confirm(
    "¿Está seguro de que desea marcar su hora de salida?"
  );

  if(!confirmar){
  
    return

  }
    const res = await horaDeSalidaPost();
    console.log(res.data);
    setSalida(res.data);
    setMensaje("");    
  setHorarios([]); 
    setMostrarform(false)
  };

  const handleHorarios = async () => {
    const res = await validarHorariosPost();
    setHorarios(res.data);
  setMensaje("");      
  setSalida(""); 
    setMostrarform(false)
  };




  const handleLogout = async () => {
     try {
      const res = await cerrarSesion();
      if (res.status === 200) {
        logout(); 
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

   const mostrarContraseñas =  async (data) =>{
      setMostrarform(true)
        setMensaje("");      
        setSalida(""); 
          setHorarios([]); 
         await cambioContrasena(data)
   }

 const handlePass = async (data) => {
  console.log("Datos del form:", data);
  const res = await cambioContrasena(data);
    setMensajePass(res.message); 
};

  return (
    <div className={styles.userContariner}>
      <div>
        <button onClick={handleSubmit}>Registrar hora de entrada</button>
        {mensaje && (
          <p className={styles.mensajeP}>
            {mensaje.message} - {mensaje.horaEntrada}
          </p>
        )}
      </div>

      <button onClick={handleSubmitExit}>Registrar hora de salida</button>
      {salida && (
        <p className={styles.mensajeP2}>
          {salida.message} - {salida.horaSalida}
        </p>
      )}

      <button onClick={handleHorarios}>Consultar horarios</button>

{Array.isArray(horarios) && horarios.length > 0 && (
  <div className={styles.mensaje4}>
    <h3>Horarios asignados</h3>
    <ul>
     {horarios.map((horario, index) => {
  if (!horario.dia_semana || !horario.hora_inicio || !horario.hora_fin) return null;
  return (
    <li key={horario.id || index} className={styles.mensaje5}>
      {horario.dia_semana}: {horario.hora_inicio} - {horario.hora_fin}
    </li>
  );
})}
    </ul>
  </div>
)}

     <button onClick={() => setMostrarform(true)}>cambiar contraseña</button>

{mostrarForm && (
  <div className={styles.BoxPassword}>
    <form onSubmit={handle2(handlePass)}>
      <h3>Cambiar contraseña</h3>
      <p>Ten en cuenta que la contraseña debe tener entre 8 y 13 caracteres...</p>

      <div className={styles.inputField}>
        <input
          type="password"
          {...register("contrasenaAntigua", {
            required: "la contraseña antigua es obligatoria",
          })}
        />
        <label>Ingrese su contraseña actual</label>
      </div>

      <div className={styles.inputField}>
        <input
          type="password"
          {...register("nuevaContrasena", {
            required: "la nueva contraseña es obligatoria",
          })}
        />
        <label>Ingrese su nueva contraseña</label>
      </div>

      <div className={styles.inputField}>
        <input
          type="password"
          {...register("confirmarContrasena", {
            required: "confirme la nueva contraseña",
          })}
        />
        <label>Confirme su nueva contraseña</label>
      </div>

      <button type="submit" className={styles.btn1}>
        Confirmar cambio de contraseña
      </button>
      {mensajePass && <p className={styles.mensajeP34}>{mensajePass}</p>}
    </form>
  </div>
)}

      

      

      <button onClick={handleLogout}>Cerrar sesión</button>
      
    
     
    </div>
  );
}

export default MenuUsersPage;
