import React from "react";
import img3 from "../../public/imgs/img6.png"
import { GrSchedules } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { DiAndroid } from "react-icons/di";
import { SiBookstack } from "react-icons/si";
import styles from "../../components/About/About.module.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";




function AboutPage(){

const {isAuthenticated} = useAuthContext();
const navigate = useNavigate();

   useEffect(()=>{
      if(isAuthenticated)navigate("/usersMenu")
   },[isAuthenticated])

    return(
        <>
        <section className={styles.container} id="about">
           <h2 className={styles.title}>Acerda del sistema</h2>
           <div className={styles.content}>
            <img src={img3} className={styles.AboutImage}></img>
            <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
               <div  className={styles.aboutItemText}>
                  <div className={styles.icons}>
                  <GrSchedules className={styles.icon} /> <h3>Gestión de Horarios</h3>
                  </div>
                <p>Una de las funcionalidades del sistema 
                  es la consulta de horarios asignados. 
                  Se mostrarán los horarios asignados para 
                  toda la semana, según el usuario correspondiente.
                </p>
               </div>
            </li>

            <li className={styles.aboutItem} >
               <div>
                  <div className={styles.icons}>
                  <IoIosTimer className={styles.icon}/><h3>Gestión de Registros</h3>
                  </div>
                <p>la gestion de registros se refiere
                    al control de entrada y salida de
                    cada usuario regitrado.
                </p>
               </div>
            </li>

            <li className={styles.aboutItem}>
               <div  className={styles.aboutItemText}>
                  <div className={styles.icons}>
                  <HiOutlineClipboardDocumentList className={styles.icon}/><h3>Visualizacion de usuarios registrados Y exportacion</h3>
                  </div>
                <p>el sistema tambien cuenta con la opcion de visualizar
                    en una tabla todos los usuarios registrados en el 
                    sistema,como tambien exportar en documentos pdf, excel o word
                    relacionados con la informacion de visualizacion de horarios
                    de cualquier usuario como el listado de usuarios registrados
                    esto claro si cuenta con un rol de administrador dentro del sistema.
                </p>
               </div>
            </li>

            <li className={styles.aboutItem}>
               <div className={styles.aboutItemText}>
               <div className={styles.icons}>
               <DiAndroid  className={styles.icon}/><h3>Portabilidad del sistema</h3>
               </div>
                <p>gracias a la construccion del frontent 
                    en react, tuvimos la capacidad de utilizar
                    React Native para desarrollar y ejecutar el sistema
                    en dispositivos con sistemas operativos Android.
                </p>
               </div>
            </li>

            <li className={styles.aboutItem} >
               <div className={styles.aboutItemText}>
                  <div className={styles.icons}>
                  <SiBookstack className={styles.icon} /><h3>Documentacion</h3>
                  </div>
                <p>una de las opciones del sistema
                   es tener una documentacion con cada opcion
                   que se explica a detalle de como utilizarlo
                   por medio de textos y videos.
                </p>
               </div>
            </li>
            </ul>
           </div>
        </section>
        </>
    )
}


export default AboutPage;