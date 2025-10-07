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
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../contexts/AuthContext.jsx";

function MenuUsersPage() {
  const [mensaje, setMensaje] = useState("");
  const [salida, setSalida] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [mostrarForm, setMostrarform] = useState(false);
  const [mensajePass, setMensajePass] = useState(""); 

  const { logout } = useAuthContext(); 
  const navigate = useNavigate(); 
  const { register, handleSubmit: handle2 } = useForm();

  const handleSubmit = async () => {
    const res = await horaDeEntradaFechaPost();
    setMensaje(res.data);
    setSalida("");      
    setHorarios([]);
    setMostrarform(false);
  };

  const handleSubmitExit = async () => {
    const confirmar = window.confirm("¿Está seguro de que desea marcar su hora de salida?");
    if (!confirmar) return;

    const res = await horaDeSalidaPost();
    setSalida(res.data);
    setMensaje("");    
    setHorarios([]); 
    setMostrarform(false);
  };

  const handleHorarios = async () => {
    const res = await validarHorariosPost();
    setHorarios(res.data);
    setMensaje("");      
    setSalida(""); 
    setMostrarform(false);
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

  const handlePass = async (data) => {
    const res = await cambioContrasena(data);
    setMensajePass(res.message); 
  };

  return (
    <div className={styles.userContariner}>
      {/* Sidebar botones */}
      <div className={styles.sidebar}>
        <button onClick={handleSubmit}>Registrar hora de entrada</button>
        <button onClick={handleSubmitExit}>Registrar hora de salida</button>
        <button onClick={handleHorarios}>Consultar horarios</button>
        <button onClick={() => setMostrarform(true)}>Cambiar contraseña</button>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      {/* Contenido central */}
      <div className={styles.mainContent}>
        {!mostrarForm ? (
          <>
            {mensaje && <p className={styles.mensajeP}>{mensaje.message} - {mensaje.horaEntrada}</p>}
            {salida && <p className={styles.mensajeP2}>{salida.message} - {salida.horaSalida}</p>}
            {Array.isArray(horarios) && horarios.length > 0 && (
              <div className={styles.mensaje4}>
                <h3>Horarios asignados</h3>
                <ul>
                  {horarios.map((horario, index) => (
                    <li key={horario.id || index} className={styles.mensaje5}>
                      {horario.dia_semana}: {horario.hora_inicio || "—"} - {horario.hora_fin || "—"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className={styles.BoxPassword}>
            <form onSubmit={handle2(handlePass)}>
              <h3>Cambiar contraseña</h3>
              <p>Ten en cuenta que la contraseña debe tener entre 8 y 13 caracteres...</p>

              <div className={styles.inputField}>
                <input type="password" {...register("contrasenaAntigua", { required: true })} placeholder=" " />
                <label>Contraseña actual</label>
              </div>

              <div className={styles.inputField}>
                <input type="password" {...register("nuevaContrasena", { required: true })} placeholder=" " />
                <label>Nueva contraseña</label>
              </div>

              <div className={styles.inputField}>
                <input type="password" {...register("confirmarContrasena", { required: true })} placeholder=" " />
                <label>Confirmar contraseña</label>
              </div>

              {mensajePass && <p className={styles.mensajeP34}>{mensajePass}</p>}

              <div className={styles.formButtons}>
                <button type="submit" className={styles.btn1}>Confirmar</button>
                <button type="button" className={styles.btnCancel} onClick={() => setMostrarform(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuUsersPage;
