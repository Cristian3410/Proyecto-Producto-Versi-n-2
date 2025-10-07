import React, { useState } from "react";
import { GiAbstract076 } from "react-icons/gi";
import styles from "./../Navbar/Navbar.module.css";
import { IoMenu, IoClose } from "react-icons/io5";
import { useStyles } from "../../contexts/StylesContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"
import { useAuthContext } from "../../contexts/AuthContext.jsx"; 
import logoPrin from "../../skill/logoPrincipalfinal.png"

function NavBar() {
  const [menuOpen, SetMenuOpen] = useState(false);
  const { SetTraslado } = useStyles();

    const { user, isAutenticated } = useAuthContext();

  const token = Cookies.get("token"); 
  let usernameFromToken = null;

  if (token) {
    try {
      const decoded = jwtDecode(token); 
      usernameFromToken = decoded.username;
    } catch (err) {
      console.error("Error decodificando token:", err);
    }
  }

  const handleMenuToggle = () => {
    SetMenuOpen(!menuOpen);
  };

  const HandleOpenClose = () => {
    SetTraslado(true);
  };

  return (
    <nav>
      {usernameFromToken ? (
        <nav className={styles.navbar}>
        <img src={logoPrin} className={styles.logoPrin}></img>
          <div className={styles.welcomeUser}>
            <p>Bienvenido  {usernameFromToken}</p>
          </div>
        </nav>
      ) : (
        <nav className={styles.navbar}>
          <img src={logoPrin}className={styles.logoPrin}></img>
          <div className={styles.menu}>
            {menuOpen ? (
              <IoClose className={styles.menuBtn} onClick={handleMenuToggle} />
            ) : (
              <IoMenu className={styles.menuBtn} onClick={handleMenuToggle} />
            )}
            <ul
              className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
              onClick={() => {
                SetMenuOpen(false);
              }}
            >
              <li><a href="#home">Inicio</a></li>
              <li><a href="#about">Acerca de</a></li>
              <li><a href="#history">Nuestra historia</a></li>
              <li><a href="#experience">Tecnología</a></li>
              <li><a href="#contact">Política de datos</a></li>
              <button className={styles.button} onClick={HandleOpenClose}>
                Acceder
              </button>
            </ul>
          </div>
        </nav>
      )}
    </nav>
  );
}

export default NavBar;

