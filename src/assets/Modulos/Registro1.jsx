import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");

  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [edad, setEdad] = useState("");
  const [error, setError] = useState("");

  const RegistrarUsuarioValido = async () => {
    const datos = {
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno,
      correo: correo,
      telefono: telefono,
      contrasenia: contrasenia,
      edad: edad,
    };
  
    try {
      const response = await Axios.post(
        "http://localhost:3001/Create",
        datos,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Verifica si el estado es "success" o "Success"
      if (response.data.status === "success" || response.data.Status === "success") {
        alert("Registro exitoso\nTu cuenta ha sido registrada correctamente");
        navigate("/Login");
      } else {
        alert("Error\nRegistro fallido");
      }
    } catch (error) {
      if (error.response) {
        // La solicitud fue realizada y el servidor respondió con un código de estado no exitoso
        console.error("Error de servidor:", error.response.data);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        console.error("No se recibió respuesta del servidor");
      } else {
        // Algo ocurrió en la configuración de la solicitud que generó un error
        console.error("Error en la configuración de la solicitud:", error.message);
      }
      alert("Error\nOcurrió un error al intentar registrar");
    }
  };
     

  const Validacion = () => {
    if (
      nombre === "" ||
      apellidoPaterno === "" ||
      apellidoMaterno === "" ||
      correo === "" ||
      telefono === "" ||
      contrasenia === "" ||
      edad === ""
    ) {
      setError("Hay campos vacíos");
    } else {
      setError("");
      RegistrarUsuarioValido();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (contrasenia !== repetirContrasena) {
      setError("Las contraseñas no coinciden, verifica por favor.");
    } else {
      setError("");
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
    const contraMensaje = document.getElementById("contraMensaje");
  
    if (contrasenia && repetirContrasena && contrasenia === repetirContrasena) {
      contraMensaje.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    } else {
      contraMensaje.innerHTML =
        '<span style="color:red">La verificación es incorrecta.</span>';
    }
  };

  const ValidarContra = () => {
    const mensaje = setMensaje;
    const mensaje2 = setRepetirContrasena;
    const emailRegex = /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[!@#$%^&*]).{8,}$/;
  
    if (emailRegex.test(contrasenia)) {
      mensaje2('<span style="color:green; font-size: 25px">&#10003</span>');
      mensaje('');
    } else if (contrasenia === "") {
      mensaje2('');
    } else {
      mensaje('<span style="color:red">Solo Mayúsculas, Minúsculas, Números y Al menos un carácter especial.</span>');
    }
  };

  const ValidarTelefono = () => {
    const partido = telefono.trim();
    const telefonoRegex = /^\d{8,14}$/;

    if (telefonoRegex.test(partido)) {
      setMensaje("");
    } else {
      setMensaje("El número de teléfono debe contener solo dígitos y tener una longitud de 8 a 14 caracteres.");
    }
  };
  const ValidarEdad = () => {
    const mensajeEdad = document.getElementById("mensajeEdad");
    const edadValor = parseInt(edad, 10);
  
    if (isNaN(edadValor) || edadValor < 18) {
      mensajeEdad.innerHTML =
        '<span style="color:red">Debes ser mayor de 18 años para registrarte.</span>';
    } else {
      mensajeEdad.innerHTML =
        '<span style="color:green; font-size: 25px">&#10003</span>';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-5 md:p-10 flex-col w-11/12 mt-10 mb-10 sm:mx-auto max-w-80rem">
      <div className="flex flex-wrap">
        <div className="md:w-1/2 mt-2">
          <img
            src="/src/img/autobus.png"
            className="w-full rounded-start mt-4"
            alt="Chucherias & Regalos"
          />
        </div>
        <div className="md:w-1/2 mt-2">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight pb-2.5 text-gray-900">
            Crear Cuenta
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-5/12 ml-5">
                <label htmlFor="Nombre" className="font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  onKeyUp={ValidarNombre}
                  placeholder="Nombre"
                  required
                />
                <span id="validarNombre"></span>
              </div>

              <div className="w-5/12 ml-5">
                <label htmlFor="ApellidoP" className="font-bold">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="apellidopa"
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  onKeyUp={ValidarApellidoPa}
                  placeholder="Apellido Paterno"
                  required
                />
                <span id="validarApellidoPa"></span>
              </div>
            </div>

            <div className="flex mb-4">
              <div className="w-5/12 ml-5">
                <label htmlFor="ApellidoM" className="font-bold">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="apellidoma"
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  onKeyUp={ValidarApellidoMa}
                  placeholder="Apellido Materno"
                  required
                />
                <span id="validarApellidoma"></span>
              </div>

              <div className="w-5/12 ml-5">
                <label htmlFor="Fecha" className="font-bold">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="edad"
                  name="edad"
                  placeholder="Edad"
                  onChange={(e) => setEdad(e.target.value)}
                  onBlur={ValidarEdad}
                  required
                />
                <span id="mensajeEdad"></span>
              </div>
            </div>

            <div className="flex mb-4">
             
              <div className="w-5/12 ml-5">
                <label htmlFor="Email" className="font-bold">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  onBlur={validarCorreo}
                  required
                  placeholder="Jose@gmail.com"
                />
                <span id="validar"></span>
              </div>
              <div className="w-5/12 ml-5">
                <label htmlFor="Telephone" className="font-bold">
                  Teléfono
               

                </label>
                <input
                  type="text"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  onBlur={ValidarTelefono}
                  maxLength="10"
                  minLength="10"
                  placeholder="7712057895"
                  required
                />
                <span id="mensajeTel" className="estupendo"></span>
              </div>
            </div>


            <div className="flex mb-4">
              
              <div className="w-5/12 ml-5">
                <label htmlFor="Contraseña" className="font-bold">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="contrasenia"
                  onChange={(e) => setContrasenia(e.target.value)}
                  onKeyUp={ValidarContra}
                  placeholder="*******"
                  required
                />
                <span id="validarContra2"></span>
                <br />
                <span id="validarContra"></span>
              </div>
              <div className="w-5/12 ml-5">
                <label htmlFor="Contraseña2" className="font-bold">
                  Confirmación de contraseña
                </label>
                <input
                  type="password"
                  className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                  id="reContraseña"
                  onChange={(e) => setRepetirContrasena(e.target.value)}
                  onBlur={validarContraseña}
                  placeholder="*******"
                  required
                />
                <span id="contraMensaje"></span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-5/12 mx-auto mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
