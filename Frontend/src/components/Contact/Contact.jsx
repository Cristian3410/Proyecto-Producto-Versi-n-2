import styles from "../Contact/Contact.module.css"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

function ContactPage() {
  const navigate = useNavigate();
  const { isAutenticated } = useAuthContext();

  useEffect(() => {
    if (isAutenticated) navigate("/usersMenu")
  }, [isAutenticated])

  return (
    <>
      <footer id="contact" className={styles.container}>
        <div className={styles.text}>
          <h2 className={styles.title}>Política de Tratamiento de Datos Personales</h2>

          <p>
            Este sistema respeta y protege la información personal de sus usuarios, 
            de conformidad con la Ley 1581 de 2012 y demás normas aplicables sobre 
            protección de datos en Colombia.
          </p>

          <h3>Responsable del tratamiento</h3>
          <p>
            Responsable: <strong>Cristian Felipe Talero Sanchez</strong> <br />
            Contacto: <strong>cristian3410st@gmail.com</strong>
          </p>

          <h3>Finalidades del tratamiento</h3>
          <ul>
            <li>Permitir el acceso y autenticación dentro de la aplicación.</li>
            <li>Gestionar horarios y registros de entrada/salida.</li>
            <li>Mantener la persistencia de sesión mediante cookies.</li>
            <li>Mejorar la experiencia de usuario y optimizar el servicio.</li>
          </ul>

          <h3>Derechos de los titulares</h3>
          <p>Los usuarios pueden en cualquier momento solicitar:</p>
          <ul>
            <li>Conocer, actualizar o rectificar sus datos.</li>
            <li>Eliminar su información de nuestras bases de datos.</li>
            <li>Revocar la autorización otorgada para el tratamiento.</li>
          </ul>

          <h3>Compromisos de privacidad</h3>
          <ul>
            <li>La información no será compartida, vendida ni transferida a terceros.</li>
            <li>Los datos se almacenan en bases de datos seguras con acceso restringido.</li>
            <li>Se aplican medidas técnicas y administrativas para proteger la confidencialidad y seguridad.</li>
          </ul>

          <h3>Procedimiento</h3>
          <p>
            Para ejercer sus derechos, el usuario podrá enviar una solicitud al correo 

           <br/> <strong>cristian3410st@gmail.com</strong> indicando su requerimiento.
          </p>

          <h3>Aceptación</h3>
          <p>
            Al utilizar esta aplicación, el usuario manifiesta su aceptación de la presente política 
            y autoriza el tratamiento de sus datos personales en los términos descritos.
          </p>
        </div>
      </footer>
    </>
  )
}

export default ContactPage;
