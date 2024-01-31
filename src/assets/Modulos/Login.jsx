import { useState } from "react";
import Input from "../componentes/ui/input.jsx";
import Label from "../componentes/ui/label.jsx";
import Axios from "axios";


export default function Login ({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la solicitud GET al servidor para iniciar sesión
    try {
      const response = await Axios.post(
        'http://localhost:3001/Login',
        {
          correo: email,
          contrasenia: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const responseData = response.data;
  
      if (response.status === 200 && responseData.status === 'success') {
        // Redirige a la página de inicio del usuario o a donde desees
        window.location.href = "/admin/";
      } else {
        // Muestra un mensaje de error detallado si es posible
        alert('Error en el inicio de sesión: ' + responseData.message);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      // Muestra un mensaje de error genérico
      alert('Error en el inicio de sesión. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
     

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="#">{title}</a>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="deisi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <div className="text-sm">
                  <a
                    href="/Boletos"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="****"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Aún no tienes una cuenta?{" "}
            <a
              href="/Registro"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Regístrate Aquí
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
