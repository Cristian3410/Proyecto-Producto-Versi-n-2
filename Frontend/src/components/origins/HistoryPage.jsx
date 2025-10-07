import React from "react";
import styles from "../origins/History.module.css"
import { MdOutlineHistoryEdu } from "react-icons/md";
import {useAuthContext} from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";


function HistoryPage(props){

    const {isAutenticated} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAutenticated)navigate("/usersMenu")
},[isAutenticated])


    return(
        <>
        <section className={styles.container} id="history">
            <div className={styles.contentTitle}>
            <MdOutlineHistoryEdu className={styles.icon} />
            <h2 className={styles.title}>Historia del Sistema</h2>
            </div>
            <div className={styles.content}>
            <p>
            El nacimiento de este sistema fue impulsado por las necesidades identificadas en mi empresa actual, 
            gracias al programa de formación que estoy cursando en análisis y desarrollo de software. 
            Mi rol actual se centra en el soporte técnico para la instalación y verificación de fibra óptica en Comfica Soluciones Integrales.
            Las necesidades que el sistema buscaba abordar incluían la facilidad de registro de entradas y salidas de los empleados,
            la automatización de la asignación de horarios, la exportación de información y la mayor seguridad en el almacenamiento de datos sensibles de los empleados.
            <br/>
            <br/>
            Para definir los requerimientos funcionales del sistema y su enfoque, se utilizaron diversas herramientas de recolección de información, como entrevistas con supervisores 
            y empleados. A lo largo de mi proceso de formación, fui desarrollando el sistema conocido como MGDT, que ahora se encuentra en su versión 1.0. Espero que esta breve historia del sistema sea de su interés, 
            y estoy comprometido a seguir mejorándolo con la retroalimentación de los usuarios finales.

            </p>
            </div>
        </section>
        </>
    )
}


export default HistoryPage;