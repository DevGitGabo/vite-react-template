import React from "react";
import { BiLogOut } from "react-icons/bi";
import authToken from "../../authToken";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del localStorage al cerrar sesión
    localStorage.removeItem("token");
    localStorage.removeItem("userInformation");

    // Elimina el token de los headers de Axios
    authToken(null);
    // Redirige al usuario a la página de inicio de sesión u otra página deseada
    navigate("/login");
  };
  return (
    <button
      className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black absolute bottom-4 w-[224px] group"
      onClick={handleLogout}
    >
      <BiLogOut className="text-lg" />
      <span className="group-hover:font-semibold">Logout</span>
    </button>
  );
};

export default Logout;
