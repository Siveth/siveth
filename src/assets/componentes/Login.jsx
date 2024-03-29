import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contra() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function nagivateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);

      axios
        .post("http://localhost:3001/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => {
          alert("Correo enviado exitosamente.");
          navigate("/OTPinput", { state: { email: email } }); // Pasa el correo electrónico como parte del estado de la ubicación
        })
        .catch((error) => {
          console.error("Error sending recovery email:", error);
          alert("Hubo un error al enviar el correo de recuperación.");
        });
    } else {
      alert("Por favor, ingresa tu correo electrónico");
    }
  }

  // Resto del código

  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Ingresa tu correo electronico</p>

                  
                </div>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>

                <div className="mb-6">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">

                  <a
                    href="#"
                    onClick={() =>nagivateToOtp()}
                    className="text-gray-800"
                  >
                    Enviar codigo                  </a>
                </div>

                <div className="text-center lg:text-left">
                  {/* <button
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button> */}

                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
