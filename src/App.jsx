import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Header from "./assets/componentes/header.jsx";
import Footer from "./assets/componentes/footer.jsx";
import Home from "./assets/componentes/home.jsx";
import Login from "./assets/Modulos/Login.jsx";
import Registro from "./assets/Modulos/Registro1.jsx";
import NotFound from "./Error/Error_404.jsx";
import Sidebar from "./assets/componentes/Admin/Dashbor.jsx";
import AdHeader from "./assets/componentes/Admin/admHeader.jsx";
import Contra from "./assets/componentes/Login.jsx";
import Reset from "./assets/componentes/Reset.jsx";
import Recovered from "./assets/componentes/Recovered.jsx";

import OTPinput from "./assets/componentes/OTPInput.jsx";
// import Titulo from "./assets/componentes/Titulo.jsx";
function App() {





 
  // const [count, setCount] = useState(0)

  const PublicRoutes = () => (
    <>
      {/* Area publica */}
      <Header />
      
        {/* {showCookiesBanner && <CookiesBanner onAccept={handleAcceptCookies} />} Muestra el banner de cookies */}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Boletos" element={<Contra />} />
          <Route path="/OTPinput" element={<OTPinput />} />
          <Route path="/Recovered" element={<Recovered />} />
          <Route path="/Reset" element={<Reset />} />
          {/* <Route path="/terms-cond" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/quienes-somos" element={<AcercaDe />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/new-address" element={<NewAddress />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/checkup" element={<Carrito />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} /> */}
          

          {/* Ruta por defecto para manejar cualquier otra ruta no definida */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </>
  );
  
  const AdminRoutes = () => (
    <>
      <AdHeader />
      <Sidebar/>
      <Routes>
         {/* <Route path="/Dash" element={<Sidebar />} /> */}
        {/* <Route path="/" element={<HomeAdmin title={title} />} />
        <Route path="/inventory" element={<Inventario title={title} />} />
        <Route path="/inventory/add-product" element={<AddProduct title={title} />} /> */}

      </Routes>
     
    </>
  );
  
  return (
    <Router>
      <Routes>
        <Route path="/admin/" element={<AdminRoutes />} /> 
        <Route path="/*" element={<PublicRoutes />} />

      </Routes>
    </Router>
    
  );
  
}

export default App
