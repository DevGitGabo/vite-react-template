import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "../Header";

import SidebarCli from "./Delivery/SidebarCli";
import GenPeDel from "./Delivery/GenPeDel";
import HistorialDelivery from "./Delivery/HistorialDelivery";
import LastPedido from "./Delivery/LastPedido";

import SidebarAd from "./Administrator/SidebarAd";
import AdminUsers from "./Administrator/AdminUsers";
import Resumen from "./Administrator/Resumen";

import SidebarCashier from "./Cashier/SidebarCashier";
import GenBolFac from "./Cashier/GenBolFac";
import GenPePor from "./Cashier/GenPePor";

import GenPedPen from "./Chef/GenPedPen";
import SidebarChef from "./Chef/SidebarChef";
import PedListo from "./Chef/PedListo";
import PedPrepa from "./Chef/PedPrepa";

import SidebarCont from "./Counter/SidebarCont";
import LastReport from "./Counter/LastReport";
import GenReport from "./Counter/GenReport";
import HistorialReport from "./Counter/HistorialReport";

import SidebarVent from "./Waiter/SidebarVent";
import HistorialPedido from "./Waiter/HistorialPedido"
import UltimoPedido from "./Waiter/UltimoPedido"
import GenPeVent from "./Waiter/GenPeVent";

const Panel = () => {
  const location = useLocation();
  const userInformation = localStorage.getItem("userInformation");
  const parsedInformation = JSON.parse(userInformation);
  const userRole = parsedInformation ? parsedInformation.user.role[0] : null;

  const renderSidebar = () => {
    switch (userRole) {
      case "ADMIN":
        return <SidebarAd />;
      case "CASHIER":
        return <SidebarCashier />;
      case "CHEF":
        return <SidebarChef />;
      case "COUNTER":
        return <SidebarCont />;
      case "DELIVERY":
        return <SidebarCli />;
      case "WAITER":
        return <SidebarVent />;
      default:
        return null; // Puedes manejar un caso por defecto si el rol no coincide con ninguno
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="flex">
          {renderSidebar()}
          <Routes location={location} key={location.pathname}>
            <Route path="PedidoVentas" element={<GenPeVent />} />
            <Route path="PedidoDelivery" element={<GenPeDel />} />
            <Route path="GenerarReporte" element={<GenReport />} />
            <Route path="Admin" element={<AdminUsers />} />
            <Route path="GenerarBoleta" element={<GenBolFac />} />
            <Route path="GenerarPedido" element={<GenPedPen />} />
            <Route path="UltimoReporte" element={<LastReport />} />
            <Route path="UltimoPedido" element={<UltimoPedido />} />
            <Route path="HistorialPedido" element={<HistorialPedido />} />
            <Route path="HistorialDelivery" element={<HistorialDelivery />} />
            <Route path="PedidoPorPagar" element={<GenPePor />} />
            <Route path="PedidoListo" element={<PedListo />} />
            <Route path="PedidoPreparando" element={<PedPrepa />} />
            <Route path="HistorialReporte" element={<HistorialReport />} />
            <Route path="Resumen" element={<Resumen />} />
            <Route path="LastPedido" element={<LastPedido />} />

            <Route
              path="*"
              element={
                userRole === "USER" || !userRole ? (
                  // Si el usuario tiene rol USER o no tiene rol, se redirige a Inicio
                  <Navigate to="/Inicio/Principal" replace={true} />
                ) : // Si tiene otro rol, no se redirige y se muestra la ruta por default
                null
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Panel;
