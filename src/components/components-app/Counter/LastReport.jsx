import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  MdNotificationsNone,
  MdEditDocument,
  MdArrowUpward,
  MdArrowDownward,
  MdArrowForwardIos,
} from "react-icons/md";
import LineChart from "./LineChart";
import VerticalBarChart from "./VerticalBarChart";
import axios from "axios";
import authToken from "../../../authToken";

const LastReport = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const [records, setRecords] = useState([]);

  useEffect(() => {
    authToken(token);

    axios
      .get(
        "https://backendcasona-production.up.railway.app/counter/getAllHistoriales"
      )
      .then((res) => {
        const data = res.data;
        const lastRecord = data.slice(-1)[0]; // Obtiene el último elemento del array
        setRecords([lastRecord]);
      });
  }, []);


  return (
    <div
      className="p-4 flex flex-col gap-5"
      style={{ width: "calc(100% - 256px)" }}
    >
      <div className=" self-end flex">
        <div className="flex bg-gray-200 items-center p-2 rounded-xl gap-2 text-lg">
          <AiOutlineSearch />
          <input
            type="search"
            placeholder="Buscar Pedido"
            className="w-44 bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex items-center px-3 text-2xl">
          <MdNotificationsNone />
        </div>
      </div>

      {records.map((record, index) => (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5" key={index}>
          <div className="bg-gray-100 shadow-2xl rounded-md w-full">
            <div className="flex flex-col px-4 pt-4 rounded-md gap-3">
              <div className="flex items-center gap-5">
                <MdEditDocument />
                <span className="font-medium">Ordenes Totales</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-4xl">{record?.datosGenerales?.totalVentas || "Null"}</span>
                <div className="mt-2 flex text-sm">
                  <span className="font-medium flex items-center mr-2 text-green-500">
                    <MdArrowUpward />
                    4.2%
                  </span>
                  desde el último mes
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-3 border-t-2 font-medium px-4 py-2 text-amber-700">
              <span>Ver detalles</span>
              <MdArrowForwardIos />
            </div>
          </div>

          <div className="bg-gray-100 shadow-2xl rounded-md w-full ">
            <div className="flex flex-col px-4 pt-4 rounded-md gap-3">
              <div className="flex items-center gap-5">
                <MdEditDocument />
                <span className="font-medium">Ganancia Neta</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-4xl">S/{record?.datosGenerales?.totalGanancias || "Null" }</span>
                <div className="mt-2 flex text-sm">
                  <span className="font-medium flex items-center mr-2 text-green-500">
                    <MdArrowUpward />
                    3.6%
                  </span>
                  desde el último mes
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-3 border-t-2 font-medium px-4 py-2 text-amber-700">
              <span>Ver detalles</span>
              <MdArrowForwardIos />
            </div>
          </div>

          <div className="bg-gray-100 shadow-2xl rounded-md w-full">
            <div className="flex flex-col px-4 pt-4 rounded-md gap-3">
              <div className="flex items-center gap-5">
                <MdEditDocument />
                <span className="font-medium">Precio Unitario</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-4xl">S/{record?.datosGenerales?.productoMasVendido?.precioUnitario || "Null"}</span>
                <div className="mt-2 flex text-sm">
                  <span className="font-medium flex items-center mr-2 text-green-500">
                    <MdArrowUpward />
                    2.5%
                  </span>
                  desde el último mes
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-3 border-t-2 font-medium px-4 py-2 text-amber-700">
              <span>Ver detalles</span>
              <MdArrowForwardIos />
            </div>
          </div>

          <div className="bg-gray-100 shadow-2xl rounded-md w-full">
            <div className="flex flex-col px-4 pt-4 rounded-md gap-3">
              <div className="flex items-center gap-5">
                <MdEditDocument />
                <span className="font-medium">Ventas Mensuales</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-4xl">{record?.datosGenerales?.productoMasVendido?.cantidadVendida || "Null"}</span>
                <div className="mt-2 flex text-sm">
                  <span className="font-medium flex items-center mr-2 text-green-500">
                    <MdArrowUpward />
                    4.2%
                  </span>
                  desde el último mes
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-3 border-t-2 font-medium px-4 py-2 text-amber-700">
              <span>Ver detalles</span>
              <MdArrowForwardIos />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-5">
        <div className="bg-gray-100 shadow-2xl rounded-md p-4 w-8/12">
          <span className="font-medium">Platos Especificos</span>
          <LineChart />
        </div>
        <div className="bg-gray-100 shadow-2xl rounded-md p-4 w-1/3 relative">
          <div className="flex justify-between items-center">
            <span className="font-medium">Reporte de Horas</span>
            <span className="text-sm font-medium text-amber-800">Ver todo</span>
          </div>
          <VerticalBarChart />
        </div>
      </div>
    </div>
  );
};

export default LastReport;
