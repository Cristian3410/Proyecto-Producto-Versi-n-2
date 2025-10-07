import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Access/Access.module.css";
import { IoMdClose } from "react-icons/io";
import { useStyles } from "../../contexts/StylesContext";
import { useAuthContext } from "../../contexts/AuthContext";

function AccessPage() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors }
  } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors: registerErrors }
  } = useForm();

  const { ContRes, setContRes, traslado, SetTraslado } = useStyles();
  const { singUp, singIn, errors, SetErrors, isAutenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAutenticated) navigate("/usersMenu");
  }, [isAutenticated]);

  const handleAcces = () => {
    setContRes(!ContRes);
    SetErrors([]);
  };

  const HandleOpenClose = () => {
    SetTraslado(false);
    SetErrors([]);
  };

  const onSubmitLogin = handleSubmitLogin((values) => {
    singIn(values);
  });

  const onSubmitRegister = handleSubmit((values) => {
    singUp(values);
  });

  return (
    <>
      <div
        className={`${styles.formPopup} ${ContRes ? styles.active : ""} ${
          traslado ? styles.activePopup : ""
        } ${errors.length > 0 ? styles.stylesErrors : ""}`}
      >
        <IoMdClose className={styles.IconClose} onClick={HandleOpenClose} />

        {/* LOGIN */}
        <div className={styles.formBoxLogin}>
          <h2>Login</h2>
          <form onSubmit={onSubmitLogin}>
            <div className={styles.inputField}>
              <input
                type="text"
                {...registerLogin("usuario", {
                  required: "El usuario es obligatorio",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Solo letras y números"
                  }
                })}
              />
              <label>Usuario</label>
              {loginErrors.usuario && <span>{loginErrors.usuario.message}</span>}
            </div>

            <div className={styles.inputField}>
              <input
                type="password"
                {...registerLogin("contraseña", {
                  required: "La contraseña es obligatoria"
                })}
              />
              <label>Contraseña</label>
              {loginErrors.contraseña && (
                <span>{loginErrors.contraseña.message}</span>
              )}
            </div>

            <div className={styles.content}>
              <div className={styles.contentCheck}>
                <input type="checkbox" {...registerLogin("checkbox")} />
                <label>Recordar credenciales</label>
              </div>
            </div>

            <Link className={styles.forgotPassword}>¿Olvidó su contraseña?</Link>
            <button className={styles.button}>Iniciar sesión</button>
          </form>

      <div className={styles.linkRes}>
  ¿Aún no te encuentras registrado?{" "}
  <button type="button" onClick={handleAcces} className={styles.linkButton} >
    Crear cuenta
  </button>
</div>

        </div>

        {/* REGISTER */}
        <div className={styles.formBoxRegister}>
          <h2>Register</h2>
          <form onSubmit={onSubmitRegister}>
            <div className={styles.inputField}>
              <input
                type="text"
                {...register("identificacion", {
                  required: "La cédula es obligatoria",
                  pattern: { value: /^[0-9]+$/, message: "Solo números" },
                  minLength: { value: 6, message: "Mínimo 6 dígitos" }
                })}
              />
              <label>Cédula</label>
              {registerErrors.identificacion && (
                <span>{registerErrors.identificacion.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("usuario", {
                  required: "El usuario es obligatorio",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Solo letras y números"
                  }
                })}
              />
              <label>Usuario</label>
              {registerErrors.usuario && (
                <span>{registerErrors.usuario.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="password"
                {...register("contraseña", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Debe contener mayúscula, minúscula y número"
                  }
                })}
              />
              <label>Contraseña</label>
              {registerErrors.contraseña && (
                <span>{registerErrors.contraseña.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("nombres", {
                  required: "Los nombres son obligatorios",
                  pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, message: "Solo letras" }
                })}
              />
              <label>Nombres</label>
              {registerErrors.nombres && (
                <span>{registerErrors.nombres.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("apellidos", {
                  required: "Los apellidos son obligatorios",
                  pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóú\s]+$/, message: "Solo letras" }
                })}
              />
              <label>Apellidos</label>
              {registerErrors.apellidos && (
                <span>{registerErrors.apellidos.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("edad", {
                  required: "La edad es obligatoria",
                  pattern: { value: /^[0-9]+$/, message: "Solo números" },
                  min: { value: 18, message: "Debe ser mayor de edad" },
                  max: { value: 100, message: "Edad no válida" }
                })}
              />
              <label>Edad</label>
              {registerErrors.edad && <span>{registerErrors.edad.message}</span>}
            </div>

            <div className={styles.inputField}>
              <input
                type="email"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de email no válido"
                  }
                })}
              />
              <label>Email</label>
              {registerErrors.email && (
                <span>{registerErrors.email.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("celular", {
                  required: "El teléfono es obligatorio",
                  pattern: { value: /^[0-9]+$/, message: "Solo números" },
                  minLength: { value: 10, message: "Mínimo 10 dígitos" }
                })}
              />
              <label>Teléfono</label>
              {registerErrors.celular && (
                <span>{registerErrors.celular.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("cargo", {
                  required: "El cargo es obligatorio"
                })}
              />
              <label>Cargo</label>
              {registerErrors.cargo && (
                <span>{registerErrors.cargo.message}</span>
              )}
            </div>

            <div className={styles.inputField}>
              <input
                type="text"
                {...register("rol", { required: "El rol es obligatorio" })}
              />
              <label>Rol</label>
              {registerErrors.rol && <span>{registerErrors.rol.message}</span>}
            </div>

            <div className={styles.contentCheck}>
              <input
                type="checkbox"
                {...register("checkbox", {
                  required: "Debes aceptar los términos"
                })}
              />
              <label>
                Aceptar{" "}
                <Link className={styles.conditions}>términos y condiciones</Link>
              </label>
              {registerErrors.checkbox && (
                <span>{registerErrors.checkbox.message}</span>
              )}
            </div>

            <button className={styles.button}>Crear cuenta</button>
          </form>

        <div className={styles.linkRes}>
  ¿Ya se encuentra registrado?{" "}
  <Link
    to="#"
    onClick={(e) => {
      e.preventDefault(); // evita que recargue la página
      handleAcces();      // cambia entre login y registro
    }}
  >
    Iniciar sesión
  </Link>
</div>
        </div>
      </div>
    </>
  );
}

export default AccessPage;
