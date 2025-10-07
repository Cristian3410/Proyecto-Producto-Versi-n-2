import { createContext, useState, useContext, useEffect } from "react";
import { registerPost, loginPost, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isAutenticated, setIsAutenticated] = useState(false);

  // 🔹 Limpia los errores automáticamente después de 10s
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // 🔹 Registro de usuario
  const singUp = async (values) => {
    try {
      const { data, status } = await registerPost(values);
      if (status === 200) {
        setUser(data);
        setIsAutenticated(true);
      } else {
        setUser(null);
        setErrors(data);
        setIsAutenticated(false);
      }
    } catch (error) {
      console.log("Error en la solicitud", error);
    }
  };

  // 🔹 Inicio de sesión
  const singIn = async (values) => {
    try {
      const { data, status } = await loginPost(values);
      if (status === 200) {
        setUser(data);
        setIsAutenticated(true);
      } else {
        setUser(null);
        setErrors(data);
        setIsAutenticated(false);
      }
    } catch (error) {
      console.error("Error en la consulta", error);
    }
  };

  // 🔹 Verificar token al montar la app
  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get(); // obtiene todas las cookies
      if (!token) {
        setIsAutenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data || res.status === 401) {
          setIsAutenticated(false);
          setUser(null);
          return;
        }

        setIsAutenticated(true);
        setUser(res.data);
      } catch (error) {
        console.log("Error al verificar token:", error);
        setIsAutenticated(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  // 🔹 🚀 Nueva función para cerrar sesión correctamente
  const logout = () => {
    setUser(null);
    setIsAutenticated(false);
    Cookies.remove("token"); // por si guardas el token en una cookie
  };

  // 🔹 Proveer los valores del contexto
  return (
    <AuthContext.Provider
      value={{
        singUp,
        singIn,
        logout, // 👈 importante
        errors,
        setErrors,
        isAutenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
