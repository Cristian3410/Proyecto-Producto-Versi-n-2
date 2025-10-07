import React from "react";
import img1 from "../../public/imgs/cambio.png"
import styles from "../../components/Home/Home.module.css"
import {useAuthContext} from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";

function HomePage(props){

  const currentHash = window.location.hash;

  const {isAutenticated} = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAutenticated)navigate("/usersMenu")
},[isAutenticated])

  return(
    <>
    <section className={styles.container} id="home">
      <div className={styles.content}>
        <h1 className={styles.title}>Hola Bienvenido a mgdt</h1>
        <p className={styles.description}>
          Aquí encontrarás todas las 
         opciones necesarias para navegar por nuestro sistema.
         Utiliza el menú que se encuentra en la parte superior 
         para acceder a las diferentes secciones y funciones disponibles.
        </p>
        <a href="mailto:cristian3410st@gmail.com" className={styles.contactBtn}>Contactanos</a>
      </div>
      <img src={img1} alt="img1" className={styles.HomeImg}></img>
      <div className={styles.topBlur}></div>
      <div className={styles.bottomBlur}></div>
       {currentHash === "#home" && props.accessPage}
    </section>
    </>
  )
}


export default HomePage;