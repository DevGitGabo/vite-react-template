import React, { useState, useEffect } from "react";
import authToken from "../../../authToken";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import imagenesPlatos from "../../platosImagenes";

const LastPedido = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const [records, setRecords] = useState([]);


  useEffect(() => {
    authToken(token);

    axios
      .get("https://backendcasona-production.up.railway.app/delivery/getAll")
      .then((res) => {
        const data = res.data;
        const lastRecord = data.slice(-1)[0]; // Obtiene el último elemento del array
        setRecords([lastRecord]);
      });
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

      {records.map((d, i) => (
        <div key={i} className="bg-[#F8EEE6] h-fit w-fit rounded-lg">
          <div>
            <img
              src={imagenesPlatos[d?.items[0]?.producto]}
              className="w-80 h-56"
            />
          </div>
          <div className="px-4 pt-4  justify-between flex">
            <span className="font-medium text-[#5E6282]">Nombre: {d?.nombre || "null"}</span>
            <span className="mr-4 text-[#5E6282]">{d?.telefono || "null"}</span>
          </div>
          <div className="px-4 py-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <BsFillSendFill className="text-sm" />
              <span className="text-[#5E6282]">{d?.metodoPago || "null"}</span>
            </div>
            <button
              className="bg-[#DFCCBD] text-yellow-800 p-2 rounded-md border border-yellow-800"
              onClick={() => handleOpenModal(d)}
            >
              Ver mas
            </button>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {showModal && records.length > 0 && (
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
                  Información:
                </div>
                <div className="flex flex-col gap-4 mt-3">
                  {records.map((record, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4">
                      <div className="font-semibold text-lg">
                        Detalle del Pedido
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col">
                          <span className="font-medium">Nombre:</span>
                          <span>{record.nombre || "null"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">Correo:</span>
                          <span>{record.correo || "null"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">Dirección:</span>
                          <span>{record.direccion || "PRESENCIAL"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">RUC:</span>
                          <span>{record.ruc || "null"}</span>
                        </div>

                        <div className="flex flex-col col-span-2">
                          <div className="flex justify-between mr-[81px]">
                            <span className="font-medium">Productos</span>
                            <span className="font-medium">Cantidad</span>
                          </div>
                          <div>
                            {record.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex justify-between mr-28"
                              >
                                <span>{item.producto} </span>
                                <span>{item.cantidad} </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col col-span-2">
                          <span className="font-medium">Método de Pago:</span>
                          <span>{record.metodoPago || "null"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LastPedido;
