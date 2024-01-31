import { useState } from "react";
import { createContext } from "react";
import Login from "../componentes/Login.jsx";
import OTPInput from "../componentes/OTPInput.jsx";
import Recovered from "../componentes/Recovered.jsx";
import Reset from "../componentes/Reset.jsx";

export const RecoveryContext = createContext();
function Appi() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  function NavigateComponents() {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;

    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
}

export default Appi;
