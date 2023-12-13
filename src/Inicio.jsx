import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Principal from "./components/Principal";
import Nosotros from "./components/Nosotros";
import Menu from "./components/Menu";
import Pedidos from "./components/Pedidos";

const Inicio = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div>
          <Header />
          <NavBar />
        </div>
        <Routes location={location} key={location.pathname}>
          <Route path="Principal" element={<Principal />} />
          <Route path="Nosotros" element={<Nosotros />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="Pedidos" element={<Pedidos />} />
        </Routes>
      </div>
    </>
  );
};

export default Inicio;
