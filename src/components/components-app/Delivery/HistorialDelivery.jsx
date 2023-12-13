import React, { useState, useEffect } from "react";
import axios from "axios";
import authToken from "../../../authToken";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye } from "react-icons/fa";

const HistorialDelivery = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const visibleColumns = ["Nombre", "Dirección", "RUC", "Cantidad", "Pago"];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    authToken(token);

    axios
      .get("https://backendcasona-production.up.railway.app/delivery/getAll")
      .then((res) => {
        setRecords(res.data);
      });
  }, []);

  console.log(records);
  //Modal al pulsar el ojo:
  const [showModal, setShowModal] = useState(false);
  //Establecemos el pedido:
  const [selectedPedido, setSelectedPedido] = useState(null); // Almacena el pedido seleccionado

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido); // Guarda el pedido seleccionado
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
  };

  return (
    <div
      className="p-4 pl-10 flex flex-col gap-5"
      style={{ width: "calc(100% - 256px)" }}
    >
      <div className="max-h-[270px] overflow-y-scroll scrollbar-none rounded-lg">
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
              // Calcular la cantidad total de ítems sumando las cantidades de cada producto
              const totalItems = d.items.reduce(
                (total, item) => total + item.cantidad,
                0
              );

              return (
                <tr key={i} className="hover:bg-gray-200">
                  <td className="text-center py-2">{d.nombre}</td>
                  <td className="text-center">{d.direccion || "PRESENCIAL"}</td>
                  <td className="text-center">{d.ruc}</td>
                  <td className="text-center">{totalItems}</td>
                  <td className="text-center">{d.metodoPago}</td>
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
          selectedPedido && ( // Verifica si hay un pedido seleccionado
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
                <div className="w-96 transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all text-black">
                  <div className="text-lg font-medium leading-6 text-gray-900">
                    Información de Pedido
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex flex-col">
                      <span className="font-medium">Nombre:</span>
                      <span>{selectedPedido.nombre || "null"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Correo:</span>
                      <span>{selectedPedido.correo || "null"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Dirección:</span>
                      <span>{selectedPedido.direccion || "PRESENCIAL"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">RUC:</span>
                      <span>{selectedPedido.ruc || "null"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Productos:</span>
                      <div>
                        {selectedPedido.items.map((item, index) => (
                          <p key={index}>
                            {item.producto} - Cantidad: {item.cantidad}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Método de Pago:</span>
                      <span>{selectedPedido.metodoPago || "null"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default HistorialDelivery;
