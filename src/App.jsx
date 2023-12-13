import { Route, Routes, Navigate , useLocation } from "react-router-dom";
import Login from "./Login.jsx";
import Inicio from "./Inicio.jsx";
import Register from "./Register.jsx";
import Panel from "./components/components-app/Panel.jsx";
import { useEffect } from "react";

const App = () => {
  
  const userInformation = localStorage.getItem("userInformation");
  const parsedInformation = JSON.parse(userInformation);
  const token = parsedInformation ? parsedInformation.token : null;

  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="Inicio/*" element={<Inicio />} />
      <Route path="Panel/*" element={token ? <Panel/> : <Navigate to="/Login" /> } />{/*element={token ? <Panel/> : <Navigate to="/Login" />}*/} 
    </Routes>
  );
};

export default App;
