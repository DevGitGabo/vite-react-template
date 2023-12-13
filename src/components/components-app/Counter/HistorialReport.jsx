import React, { useState, useEffect } from "react";
import axios from "axios";
import authToken from "../../../authToken";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye } from "react-icons/fa";

//COMPONENTES DEL MODAL DEPENDIENDO DEL TIPOREPORTE:
const VentasModalContent = ({ selectedReporte }) => (
  <div className="w-96 h-[340px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 transform overflow-hidden rounded-s-2xl bg-white p-5 text-left align-middle shadow-xl transition-all text-black">
    <div className="text-lg font-medium leading-6 text-gray-900">
      Reporte de Venta
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <span className="font-semibold">Datos Generales:</span>
      <span>Ventas Totales: {selectedReporte.datosGenerales?.totalVentas}</span>
      <span>Ventas por Mes:</span>
      {typeof selectedReporte.datosGenerales?.ventasPorMes === "object" ? (
        Object.entries(selectedReporte.datosGenerales.ventasPorMes).map(
          ([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          )
        )
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}

      <span className="font-semibold">Producto más vendido:</span>
      <span>
        Nombre de Producto:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.nombreProducto ||
          "null"}
      </span>
      <span>
        Cantidad Vendida:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.cantidadVendida ||
          "null"}
      </span>
      <span>Ventas por Mes del Producto más vendido:</span>
      {typeof selectedReporte.datosGenerales?.productoMasVendido
        ?.ventasPorMesProducto === "object" ? (
        Object.entries(
          selectedReporte.datosGenerales?.productoMasVendido
            ?.ventasPorMesProducto
        ).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}

      <span className="font-semibold">Producto más rentable:</span>
      <span>
        Nombre de Producto:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.nombreProducto ||
          "null"}
      </span>
      <span>
        Cantidad Vendida:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.cantidadVendida ||
          "null"}
      </span>
      <span>Ventas por Mes del Producto más rentable:</span>
      {typeof selectedReporte.datosGenerales?.productoMasRentable
        ?.ventasPorMesProducto === "object" ? (
        Object.entries(
          selectedReporte.datosGenerales?.productoMasRentable
            ?.ventasPorMesProducto
        ).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}

      <span className="font-semibold">Productos Específicos:</span>
      {selectedReporte.productos?.map((producto, index) => (
        <div key={index} className="border p-2 rounded-md flex flex-col gap-2">
          <span>Nombre del Producto: {producto.nombreProducto}</span>
          <span>Cantidad Vendida: {producto.cantidadVendida}</span>
          <span>Ventas por mes del producto:</span>
          {Object.entries(producto.ventasPorMesProducto).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const GananciasModalContent = ({ selectedReporte }) => (
  <div className="w-96 h-[340px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 transform overflow-hidden rounded-s-2xl bg-white p-5 text-left align-middle shadow-xl transition-all text-black">
    <div className="text-lg font-medium leading-6 text-gray-900">
      Reporte de Ganancia
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <span className="font-semibold">Datos Generales:</span>
      <span>
        Ganancias Totales: {selectedReporte.datosGenerales?.totalGanancias}
      </span>
      <span>Ganancias por Mes:</span>
      {typeof selectedReporte.datosGenerales?.gananciasPorMes === "object" ? (
        Object.entries(selectedReporte.datosGenerales.gananciasPorMes).map(
          ([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          )
        )
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}

      <span className="font-semibold">Producto más vendido:</span>
      <span>
        Nombre de Producto:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.nombreProducto ||
          "null"}
      </span>
      <span>
        Ganancia Total:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.gananciaTotal ||
          "null"}
      </span>
      <span>
        Precio Unitario:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.precioUnitario ||
          "null"}
      </span>
      <span className="font-semibold">Producto más rentable:</span>
      <span>
        Nombre de Producto:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.nombreProducto ||
          "null"}
      </span>
      <span>
        Ganancia Total:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.gananciaTotal ||
          "null"}
      </span>
      <span>
        Precio Unitario:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.precioUnitario ||
          "null"}
      </span>

      <span className="font-semibold">Productos Específicos:</span>
      {selectedReporte.productos?.map((producto, index) => (
        <div key={index} className="border p-2 rounded-md flex flex-col gap-2">
          <span>Nombre del Producto: {producto.nombreProducto}</span>
          <span>Ganancia Total: {producto.gananciaTotal}</span>
          <span>Precio Unitario: {producto.precioUnitario}</span>
        </div>
      ))}
    </div>
  </div>
);

const GeneralModalContent = ({ selectedReporte }) => (
  <div className="w-96 h-[340px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 transform overflow-hidden rounded-s-2xl bg-white p-5 text-left align-middle shadow-xl transition-all text-black">
    <div className="text-lg font-medium leading-6 text-gray-900">
      Reporte General
    </div>
    <div className="flex flex-col gap-2 mt-2">
      <span className="font-semibold">Datos Generales:</span>
      <span>Ventas Totales: {selectedReporte.datosGenerales?.totalVentas}</span>
      <span>
        Ganancias Totales: {selectedReporte.datosGenerales?.totalGanancias}
      </span>
      <span>Ventas por Mes:</span>
      {typeof selectedReporte.datosGenerales?.ventasPorMes === "object" ? (
        Object.entries(selectedReporte.datosGenerales.ventasPorMes).map(
          ([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          )
        )
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}

      <span>Ganancias por Mes:</span>
      {typeof selectedReporte.datosGenerales?.gananciasPorMes === "object" ? (
        Object.entries(selectedReporte.datosGenerales.gananciasPorMes).map(
          ([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          )
        )
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}

      <span className="font-semibold">Producto más vendido:</span>
      <span>
        Nombre de Producto:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.nombreProducto ||
          "null"}
      </span>
      <span>
        Cantidad Vendida:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.cantidadVendida ||
          "null"}
      </span>
      <span>
        Ganancia Total:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.gananciaTotal ||
          "null"}
      </span>
      <span>
        Precio Unitario:{" "}
        {selectedReporte.datosGenerales?.productoMasVendido?.precioUnitario ||
          "null"}
      </span>
      <span>Ventas por Mes del Producto más vendido:</span>
      {typeof selectedReporte.datosGenerales?.productoMasVendido
        ?.ventasPorMesProducto === "object" ? (
        Object.entries(
          selectedReporte.datosGenerales?.productoMasVendido
            ?.ventasPorMesProducto
        ).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}
      <span className="font-semibold">Producto más rentable:</span>
      <span>
        Nombre de Producto:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.nombreProducto ||
          "null"}
      </span>
      <span>
        Cantidad Vendida:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.cantidadVendida ||
          "null"}
      </span>
      <span>
        Ganancia Total:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.gananciaTotal ||
          "null"}
      </span>
      <span>
        Precio Unitario:{" "}
        {selectedReporte.datosGenerales?.productoMasRentable?.precioUnitario ||
          "null"}
      </span>
      <span>Ventas por Mes del Producto más rentable:</span>
      {typeof selectedReporte.datosGenerales?.productoMasRentable
        ?.ventasPorMesProducto === "object" ? (
        Object.entries(
          selectedReporte.datosGenerales?.productoMasRentable
            ?.ventasPorMesProducto
        ).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))
      ) : (
        <div className="text-red-600 animate-pulse">
          No hay datos disponibles
        </div>
      )}
      <span className="font-semibold">Productos Específicos:</span>
      {selectedReporte.productos?.map((producto, index) => (
        <div key={index} className="border p-2 rounded-md flex flex-col gap-2">
          <span>Nombre del Producto: {producto.nombreProducto}</span>
          <span>Cantidad Vendida: {producto.cantidadVendida}</span>
          <span>Ganancia Total: {producto.gananciaTotal}</span>
          <span>Precio Unitario: {producto.precioUnitario}</span>
          <span>Ventas por mes del producto:</span>
          {Object.entries(producto.ventasPorMesProducto).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const HistorialReport = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const visibleColumns = ["Total", "Producto", "Cantidad de Productos", "Tipo"];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    authToken(token);

    axios
      .get(
        "https://backendcasona-production.up.railway.app/counter/getAllHistoriales"
      )
      .then((res) => {
        setRecords(res.data);
      });
  }, []);

  //console.log(records);
  //Modal al pulsar el ojo:
  const [showModal, setShowModal] = useState(false);
  //Establecemos el reporte:
  const [selectedReporte, setSelectedReporte] = useState(null); // Almacena el reporte seleccionado

  const handleOpenModal = (reporte) => {
    setSelectedReporte(reporte); // Guarda el pedido seleccionado
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReporte(null);
  };

  const ReportModal = ({ selectedReporte }) => {
    let modalContent;

    switch (selectedReporte?.tipoReporte) {
      case "VENTAS":
        modalContent = <VentasModalContent selectedReporte={selectedReporte} />;
        break;
      case "GANANCIAS":
        modalContent = (
          <GananciasModalContent selectedReporte={selectedReporte} />
        );
        break;
      default:
        modalContent = (
          <GeneralModalContent selectedReporte={selectedReporte} />
        );
        break;
    }

    return <div>{modalContent}</div>;
  };

  return (
    <div
      className="p-4 pl-10 flex flex-col gap-5"
      style={{ width: "calc(100% - 256px)" }}
    >
      <div className="max-h-[600px] overflow-y-scroll scrollbar-none rounded-lg">
        <table className="w-full">
          <thead className="bg-amber-800 text-white">
            <tr>
              {visibleColumns.map((c, i) => (
                <th className="p-2" key={i}>
                  {c}
                </th>
              ))}
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => {
              let total =
                d.tipoReporte === "VENTAS"
                  ? d.datosGenerales?.totalVentas
                  : d.datosGenerales?.totalGanancias;
              let producto =
                d.tipoReporte === "VENTAS"
                  ? d.datosGenerales?.productoMasVendido?.nombreProducto
                  : d.datosGenerales?.productoMasRentable?.nombreProducto;

              return (
                <tr key={i} className="hover:bg-gray-200">
                  <td className="text-center">{total}</td>
                  <td className="text-center">{producto}</td>
                  <td className="text-center">{d.productos?.length}</td>
                  <td className="text-center">{d.tipoReporte || "GENERAL"}</td>
                  <td className="flex justify-center mt-2">
                    <FaEye
                      className="text-amber-700 hover:scale-110 rounded-full text-xl cursor-pointer"
                      onClick={() => handleOpenModal(d)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showModal &&
          selectedReporte && ( // Verifica si hay un reporte seleccionado
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center"
              onClick={handleCloseModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex w-fit h-fit bg-transparent text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ReportModal selectedReporte={selectedReporte} />
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default HistorialReport;
