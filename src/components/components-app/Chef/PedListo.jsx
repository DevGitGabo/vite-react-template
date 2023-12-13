import React, { useState, useEffect } from "react";
import axios from "axios";
import authToken from "../../../authToken";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import imagenesPlatos from "../../platosImagenes";

const PedListo = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const [records, setRecords] = useState([]);
  console.log(records);

  useEffect(() => {
    authToken(token);

    axios
      .get("https://backendcasona-production.up.railway.app/chef/getAll")
      .then((res) => {
        // Filtrar los registros por el status "EN_PREPARACION"
        const pendientes = res.data.filter(
          (registro) => registro.status === "LISTO"
        );
        setRecords(pendientes);
      });
  }, []);

  //ABRIR MODAL:
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido); // Guarda el pedido seleccionado
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);

    // Aquí podrías realizar la solicitud para actualizar los datos al cerrar el modal
    authToken(token);
    axios
      .get("https://backendcasona-production.up.railway.app/chef/getAll")
      .then((res) => {
        // Filtrar los registros por el status "EN_PREPARACION"
        const pendientes = res.data.filter(
          (registro) => registro.status === "LISTO"
        );
        setRecords(pendientes);
      });
  };

  //Establecemos la Orden seleccionada en los detalles:
  const [selectedPedido, setSelectedPedido] = useState(null); // Almacena el pedido seleccionado

  return (
    <div
      className="p-4 pl-10 flex flex-col gap-5"
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

      <div className="flex flex-wrap gap-4 max-h-[600px] overflow-y-scroll scrollbar-thin">
        {records.map((d, i) => (
          <div key={i} className="bg-[#F8EEE6] h-fit w-fit rounded-lg">
            <div>
              <img
                src={imagenesPlatos[d?.items[0]?.producto]}
                className="w-80 h-56"
              />
            </div>
            <div className="px-4 pt-4  justify-between flex">
              <span className="font-medium text-[#5E6282]">Pedido {d.id}</span>
              <span className="mr-4 text-[#5E6282]">S/.{d.monto_total}</span>
            </div>
            <div className="px-4 py-4 flex justify-between">
              <div className="flex gap-2 items-center">
                <BsFillSendFill className="text-sm" />
                <span className="text-[#5E6282]">30 min</span>
              </div>
              <button
                className="bg-[#DFCCBD] text-yellow-800 px-3 py-1.5 rounded-md border border-yellow-800"
                onClick={() => handleOpenModal(d)}
              >
                Detalles
              </button>
            </div>
          </div>
        ))}
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
                <div className="w-80 overflow-hidden rounded-2xl bg-white p-5 text-left shadow-xl transition-all text-black">
                  <div className="text-xl font-medium leading-6 text-gray-900 mb-4">
                    Detalles:
                  </div>
                  <div className="flex justify-between">
                    <div className="font-semibold mb-2 text-lg">Productos</div>
                    <div className="font-semibold mb-2 text-lg">Cantidad</div>
                  </div>
                  <div className="space-y-2">
                    {selectedPedido.items.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-300 pb-1 flex justify-between"
                      >
                        <span>{item.producto}</span>
                        <span className="mr-8">{item.cantidad}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="status"
                      className="mr-1 font-semibold text-lg"
                    >
                      Estado:
                    </label>
                    <select
                      id="status"
                      value={selectedPedido.status}
                      className="outline-none focus:border-blue-500 border border-gray-300 rounded px-2 py-1"
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setSelectedPedido((prevPedido) => ({
                          ...prevPedido,
                          status: newStatus,
                        }));
                        axios
                          .put(
                            `https://backendcasona-production.up.railway.app/chef/update/${selectedPedido.id}`,
                            { status: newStatus }
                          )
                          .then((res) => {
                            // Manejar la respuesta si es necesario
                          })
                          .catch((error) => {
                            // Manejar errores
                          });
                      }}
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="EN_PREPARACION">En preparación</option>
                      <option value="LISTO">Listo</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default PedListo;
