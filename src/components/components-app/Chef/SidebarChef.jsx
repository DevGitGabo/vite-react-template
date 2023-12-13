import React from "react";
import { BiSolidBriefcase, BiSolidDashboard, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logout from "../Logout";

const SidebarChef = () => {
  return (
    <div
      className="flex flex-col p-4 bg-[#F8EEE6] w-64 relative"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className=" text-sm text-gray-500">Panel Usuario</div>
      <div className="my-5 flex flex-col gap-5">
        <Link
          to="/Panel/GenerarPedido"
          className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black group"
        >
          <BiSolidDashboard className="text-lg" />
          <span className="group-hover:font-semibold">Pedidos Pendientes</span>
        </Link>

        <Link to="/Panel/PedidoPreparando" className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black group">
          <BiSolidBriefcase className="text-lg" />
          <span className="group-hover:font-semibold">
            Pedidos en Preparación
          </span>
        </Link>

        <Link to="/Panel/PedidoListo" className="flex items-center gap-2 p-3 rounded-lg text-gray-500 hover:bg-[#e2c9ba] hover:text-black group">
          <BiSolidBriefcase className="text-lg" />
          <span className="group-hover:font-semibold">Pedidos Listos</span>
        </Link>
      </div>

      <Logout />
    </div>
  );
};

export default SidebarChef;
