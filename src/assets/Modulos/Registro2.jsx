import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [edad, setEdad] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  /*const valTel = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '')
        setValue('numberPhone', inputValue);
    }*/

    const RegistrarUsuarioValido = async () => {
        const datos = {
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            correo: correo,
            telefono: telefono,
            edad: edad,
            contrasenia: contrasenia,
        };
        try {
            const response = await fetch("http://localhost/prySiveth/web_services/Registro.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });
            if (response.ok) {
                const responseData = await response.json();
                if (responseData.status === "success") {
                    alert("Registro exitoso", "Tu cuenta ha sido registrada correctamente");
                    navigate("/Login");
                } else {
                    alert("Error", "Registro fallido");
                }
            } else {
                alert("Error", "No se pudo completar el registro");
            }
        } catch (error) {
            console.error("Error al intentar registrar:", error);
            alert("Error", "Ocurrió un error al intentar registrar");
        }
    };

  const Validacion = () => {
    if (
      nombre === "" ||
      apellidoPaterno === "" ||
      apellidoMaterno === "" ||
      correo === "" ||
      telefono === "" ||
      edad === "" ||
      contrasenia === ""
    ) {
      setMensaje("Hay campos vacíos");
      return false;
    }
    RegistrarUsuarioValido();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contrasenia !== repetirContrasena) {
        setMensaje("Las contraseñas no coinciden, verifique por favor.");
    } else {
        Validacion();
    }
};


  const ValidarNombre = () => {
    const mensaje = document.getElementById("nombre");
    const nota = document.getElementById("validarNombre");
    const partido = mensaje.value.trim();
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;

    if (nombreRegex.test(partido)) {
      nota.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    } else {
      nota.innerHTML =
        '<span style="color:red">El nombre debe contener solo letras y espacios, con una longitud de 3 a 40 caracteres</span>';
    }
  };

  const ValidarApellidoPa = () => {
    const mensaje = document.getElementById("apellidopa");
    const nota = document.getElementById("validarApellidoPa");
    const partido2 = mensaje.value.trim();
    const nombreRegex2 = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;

    if (nombreRegex2.test(partido2)) {
      nota.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    } else {
      nota.innerHTML =
        '<span style="color:red">El Apellido Paterno debe contener solo letras y espacios con una longitud menor de 40.</span>';
    }
  };

  const ValidarApellidoMa = () => {
    const mensaje = document.getElementById("apellidoma");
    const nota = document.getElementById("validarApellidoma");
    const partido3 = mensaje.value.trim();
    const nombreRegex3 = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;

    if (nombreRegex3.test(partido3)) {
      nota.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    } else {
      nota.innerHTML =
        '<span style="color:red">El Apellido Materno debe contener solo letras y espacios y una longitud menos de 40.</span>';
    }
  };

  const validarCorreo = () => {
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("validar");
    const partido3 = correo.value.trim();
    const correoRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (correoRegex.test(partido3)) {
      mensaje.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    } else {
      mensaje.innerHTML =
        '<span style="color:red">El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.</span>';
    }
  };

  const validarContraseña = () => {
    const contra = document.getElementById("contrasenia");
    const reContra = document.getElementById("reContraseña");
    const contraMensaje = document.getElementById("contraMensaje");

    if (contra.value === reContra.value) {
        contraMensaje.innerHTML = '<span style="color:green; font-size: 25px">&#10003</span>';
    } else {
        contraMensaje.innerHTML = '<span style="color:red">La verificación es incorrecta.</span>';
    }
};

  const ValidarContra = () => {
    const contra = document.getElementById("contrasenia");
    const mensaje = document.getElementById("validarContra");
    const mensaje2 = document.getElementById("validarContra2");
    const emailRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{8,}$/;

    if (emailRegex.test(contra.value)) {
      mensaje2.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
      mensaje.innerHTML = "";
    } else if (contra.value === "") {
      mensaje2.innerHTML = "";
    } else {
      mensaje.innerHTML =
        '<span style="color:red">Solo Mayúsculas, Minúsculas, Números y Almenos un caracter especial.</span>';
    }
  };

  const ValidarTelefono = () => {
    const tel = document.getElementById("telefono");
    const mensaje = document.getElementById("mensajeTel");
    const mensaje2 = document.getElementById("mensajeTel2");
    const partido = tel.value.trim();
    const telefonoRegex = /^\d{8,14}$/;

    if (telefonoRegex.test(partido)) {
      mensaje2.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
      mensaje.innerHTML = "";
    } else {
      mensaje.innerHTML =
        '<span style="color:red">El número de teléfono debe contener solo dígitos y tener una longitud de 8 a 14 caracteres.</span>';
      mensaje2.innerHTML = "";
    }
  };

  const ValidarEdad = () => {
    const edadInput = document.getElementById("edad");
    const mensajeEdad = document.getElementById("mensajeEdad");

    const edad = parseInt(edadInput.value, 10);

    if (isNaN(edad) || edad < 18) {
      mensajeEdad.innerHTML =
        '<span style="color:red">Debes ser mayor de 18 años para registrarte.</span>';
    } else {
      mensajeEdad.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    }
  };

  return (
    <div
      className="login-container d-flex justify-content-center align-items-center"
      style={{ height: "120vh", backgroundColor: "#f7f7f7" }}
    >
      <div
        className="login-card"
        style={{
          width: "100%",
          maxWidth: "950px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          padding: "40px",
          backgroundColor: "#fff",
          marginBottom: "80px",
        }}
      >
        <form onSubmit={handleSubmit} className="form">
          <div className="datosReg container" style={{ marginTop: "5%" }}>
            <div className="row" style={{ marginBottom: "20px" }}>
              <h2
                className="form-signin-heading"
                style={{
                  marginBottom: "30px",
                  color: "#333",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Bienvenido a registro
              </h2>
              <div className="col-md-6">
                <h4 className="titulo">Nombre(s)</h4>
                <input
                  className="cajas form-control"
                  type="text"
                  placeholder="Nombre(s)"
                  id="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  onKeyUp={ValidarNombre}
                  required
                />
                <span id="validarNombre"></span>
              </div>

              <div className="col-md-6">
                <h4 className="titulo">Apellido paterno</h4>
                <input
                  className="cajas form-control"
                  type="text"
                  placeholder="Ingresa tu apellido paterno"
                  id="apellidopa"
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  onKeyUp={ValidarApellidoPa}
                  required
                />
                <span id="validarApellidoPa"></span>
              </div>
            </div>
            <div className="row" style={{ marginBottom: "20px" }}>
              <div className="col-md-6">
                <h4 className="titulo">Apellido materno</h4>
                <input
                  className="cajas form-control"
                  type="text"
                  placeholder="Ingresa tu apellido materno"
                  id="apellidoma"
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  onKeyUp={ValidarApellidoMa}
                  required
                />
                <span id="validarApellidoma"></span>
              </div>
            </div>
            <div className="row" style={{ marginBottom: "20px" }}>
              <div className="col-md-6" style={{ width: "50%" }}>
                {" "}
                {/* Changed width here */}
                <h4 className="titulo">Correo</h4>
                <input
                  className="cajas form-control"
                  placeholder="Ingresa tu correo"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  onBlur={validarCorreo}
                  required
                />
                <span id="validar"></span>
              </div>
              <div className="col-md-6" style={{ width: "50%" }}>
                {" "}
                {/* Changed width here */}
                <h4 className="titulo">Celular</h4>
                <input
                  className="cajas form-control"
                  type="tel"
                  placeholder="Ingresa numero telefonico"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  onBlur={ValidarTelefono}
                  maxLength="10"
                  minLength="10"
                  required
                />
                <span id="mensajeTel2"></span>
                <br />
                <span id="mensajeTel" className="estupendo"></span>
              </div>

              <div className="col-md-6" style={{ width: "50%" }}>
                <h4 className="titulo">Edad</h4>
                <input
                  className="cajas form-control"
                  type="number"
                  placeholder="Ingresa tu edad"
                  id="edad"
                  onBlur={ValidarEdad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                />
                <span id="mensajeEdad"></span>
              </div>
            </div>
            <div className="row" style={{ marginBottom: "20px" }}>
              <div className="col-md-6" style={{ width: "50%" }}>
                {" "}
                {/* Changed width here */}
                <h4 className="titulo">Cree una contraseña</h4>
                <input
                  className="cajas form-control"
                  type="password"
                  placeholder="Ingresa una contraseña"
                  id="contrasenia"
                  onChange={(e) => setContrasenia(e.target.value)}
                  onKeyUp={ValidarContra}
                  required
                />
                <span id="validarContra2"></span>
                <br />
                <span id="validarContra"></span>
              </div>
              <div className="col-md-6" style={{ width: "50%" }}>
                {" "}
                {/* Changed width here */}
                <h4 className="titulo">Confirmar contraseña</h4>
                <input
                  className="cajas form-control"
                  type="password"
                  placeholder="Confirma la contraseña"
                  id="reContraseña"
                  onChange={(e) => setRepetirContrasena(e.target.value)}
                  onBlur={validarContraseña}
                  required
                />
                <span id="contraMensaje"></span>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                color: "red",
                animation: "beautifulAnimation",
              }}
            >
              {mensaje && <div>{mensaje}</div>}
            </div>
            <div
              className="BotonReg d-flex justify-content-center"
              style={{ marginBottom: "20px" }}
            >
              <input
                type="submit"
                value="Crear cuenta"
                className="btn btn-primary"
                style={{
                  backgroundColor: "blue",
                  borderColor: "#004b9b",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              />
            </div>
            <p className="mt-4 text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/Login"
                style={{ color: "#7d0430", textDecoration: "none" }}
              >
                Ir a Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
