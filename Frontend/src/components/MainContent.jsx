import HomePage from "../components/Home/HomePage"
import AboutPage from "./About/AboutPage"
import HistoryPage from "./origins/HistoryPage"
import ExperiencePage from "./experience/Experience"
import ContactPage from "./Contact/Contact"
import AccessPage from "./Access/AccessPage"
import styles from "../components/MainContent.module.css"
import { useStyles } from "../contexts/StylesContext"
import { useAuthContext } from "../contexts/AuthContext"
import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"




function MainContent(){

    const {errors,SetErrors,isAutenticated} = useAuthContext();
    const {traslado,SetTraslado} = useStyles();
    const Navigate = useNavigate();


    useEffect(()=>{
        if(isAutenticated)Navigate("/usersMenu")
       },[isAutenticated])
 
    const containerClass =  traslado ? `${styles.blurbgoverlay}`:"";

    return(
     <>
     <div>
        <div className={containerClass}></div>

       <div className={styles.containerErrors}>
       {
            errors.map((error,i)=>(
                <div key={i} className={styles.errores} style={{"--index":i}}>
             <MdErrorOutline className={styles.icon} />
                   {error}
                
                </div>
            ))
            
        }
       </div>  
        <AccessPage/>
     <HomePage/>
     <AboutPage/>
     <HistoryPage/>
     <ExperiencePage/>
     <ContactPage/>
     </div>
     </>
    )
}

export default MainContent