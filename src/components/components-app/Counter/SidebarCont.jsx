import { BiSolidBriefcase, BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Logout from "../Logout";
import React, { useState, useEffect } from 'react';


const SidebarCont = () => {
  const location = useLocation();
  const [sidebarStyle, setSidebarStyle] = useState({
    divClass: "flex flex-col p-4 bg-[#F8EEE6] w-64 relative h-screen",
    divStyle: { height: "calc(100vh - 80px)" },
  });

  useEffect(() => {
    if (location.pathname === "/Panel/GenerarReporte") {
      setSidebarStyle({
        divClass: "flex flex-col p-4 bg-[#F8EEE6] w-64 relative",
        divStyle: { height: "calc(100vh - 80px)" },
      });
    } else if (location.pathname === "/Panel/UltimoReporte") {
      setSidebarStyle({
        divClass: "flex flex-col p-4 bg-[#F8EEE6] w-64 relative h-screen"
      });
    }
  }, [location.pathname]);

  return (
    <div className={sidebarStyle.divClass}  style={sidebarStyle.divStyle}>
      <div className=" text-sm text-gray-500">Panel de Usuario</div>
      <div className="my-5 flex flex-col gap-5">
        <Link className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black group" to="/Panel/UltimoReporte">
          <BiSolidDashboard className="text-lg" />
          <span className="group-hover:font-semibold">Ultimo Reporte</span>
        </Link>

        <Link className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black group" to="/Panel/GenerarReporte">
          <BiSolidBriefcase className="text-lg" />
          <span className="group-hover:font-semibold">Generar Reporte</span>
        </Link>

        <Link className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black group" to="/Panel/HistorialReporte">
          <BiSolidBriefcase className="text-lg" />
          <span className="group-hover:font-semibold">Historial de Reportes</span>
        </Link>
      </div>

      <Logout />
    </div>
  );
};

export default SidebarCont;
