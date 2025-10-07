import React from "react";
import data from "../../skill/data.js"
import styles from "../../components/experience/Experience.module.css"
import backend from "../../skill/sever.png"
import frontend from "../../skill/basic.png"
import {useAuthContext} from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";



function ExperiencePage(){

  const {isAutenticated} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAutenticated)navigate("/usersMenu")
},[isAutenticated])


    return(
      <>
      <section id="experience" className={styles.container}>
        <h2 className={styles.title}>Tecnologías Utilizadas</h2>
        <div className={styles.content}>
            <div className={styles.skills}>{
              data.map((data,id)=>{

                return <div key={id} className={styles.skill}>
                  <div className={styles.skillImageContainer}>
                    <img  src={data.imagenSrc} alt={data.title} className={styles.img}/>
                    </div>
                    <p>{data.title}</p>
                </div>
              })}</div>

              <div>
            <ul className={styles.history}>
            <li  className={styles.historyItem}>
               <img src={frontend} className={styles.historyImg}/>
               <div className={styles.historyItemDetails}>
              <h3>Frontend</h3>
              <p>En este proyecto, se empleó React en conjunto con CSS y JavaScript, 
                y React Native para crear la interfaz gráfica y garantizar la portabilidad 
                a dispositivos Android. Estas tecnologías se combinaron hábilmente para desarrollar 
                una experiencia de usuario fluida y adaptable, lo que permitió una navegación intuitiva 
                y una funcionalidad óptima tanto en navegadores web como en dispositivos móviles.
              </p>
            </div>
            </li>
            </ul>

            <ul className={styles.history}>
            <li  className={styles.historyItem}>
               <img src={backend} className={styles.historyImg}/>
               <div className={styles.historyItemDetails}>
              <h3>Backend</h3>
              <p>En el desarrollo del backend, se emplearon Node.js y JavaScript, 
                junto con MySQL para la gestión y control de la base de datos, permitiendo 
                realizar consultas eficientes sobre los diferentes conjuntos de datos. 
                Estas tecnologías se combinaron de manera efectiva para proporcionar 
                un sólido soporte para la lógica del servidor, garantizando un funcionamiento 
                fluido y seguro de la aplicación en su totalidad.
              </p>
            </div>
            </li>
            </ul>
            </div>
        </div>
      </section>
      </>
    )
}

export default ExperiencePage