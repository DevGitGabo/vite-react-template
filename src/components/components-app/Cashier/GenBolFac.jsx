import React, { useState, useEffect } from "react";
import axios from "axios";
import authToken from "../../../authToken";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import imagenesPlatos from "../../platosImagenes";

const GenBolFac = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const [records, setRecords] = useState([]);

  useEffect(() => {
    authToken(token);

    axios
      .get("https://backendcasona-production.up.railway.app/cashier/getAll")
      .then((res) => {
        // Filtrar los registros por el status "PAGADO"
        const pagados = res.data.filter(
          (registro) => registro.status === "PAGADO"
        );
        setRecords(pagados);
      });
  }, []);

  //ABRIR MODAL:
  const [showModal, setShowModal] = useState(false);

  const handleModalInfo = (pedido, endpoint, setInfoFunc) => {
    setSelectedPedido(pedido);

    authToken(token);

    axios
      .get(
        `https://backendcasona-production.up.railway.app/cashier/${endpoint}/${pedido.id}`
      )
      .then((res) => {
        setInfoFunc(res.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error(`Error al obtener la información de ${endpoint}:`, error);
      });
  };

  const handleOpenModal = (pedido) => {
    handleModalInfo(pedido, "boleta", setBoletaInfo);
  };

  const handleFacturaModal = (pedido) => {
    handleModalInfo(pedido, "factura", setFacturaInfo);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
    setBoletaInfo(null); // Reinicia el estado de la información de la boleta
    setFacturaInfo(null); // Reinicia el estado de la información de la factura

    // Aquí podrías realizar la solicitud para actualizar los datos al cerrar el modal
    authToken(token);
    axios
      .get("https://backendcasona-production.up.railway.app/cashier/getAll")
      .then((res) => {
        // Filtrar los registros por el status "PAGADO"
        const pendientes = res.data.filter(
          (registro) => registro.status === "PAGADO"
        );
        setRecords(pendientes);
      });
  };

  const [selectedPedido, setSelectedPedido] = useState(null); // Almacena el pedido seleccionado

  const [boletaInfo, setBoletaInfo] = useState(null); //Almacena info de la boleta
  const [facturaInfo, setFacturaInfo] = useState(null); //Almacena info de la factura

  //Imprimir Boleta y Factura:

  const handlePrintBoleta = () => {
    const doc = new jsPDF();

    if (boletaInfo) {
      // Define la posición inicial para cada sección
      let y = 10;

      // Define el estilo para el encabezado
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Boleta", 10, y);

      // Incrementa la posición vertical
      y += 10;

      // Define el estilo para los detalles de la boleta
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Agrega cada detalle de la boleta con saltos de línea
      doc.text(`Cliente: ${boletaInfo.clienteNombre}`, 10, y);
      y += 10;

      // Ajusta la dirección si es null
      const direccion = boletaInfo.clienteDireccion || "PRESENCIAL";
      doc.text(`Dirección: ${direccion}`, 10, y);
      y += 10;

      doc.text(`Fecha de Emisión: ${boletaInfo.fechaEmision}`, 10, y);
      y += 10;

      doc.text(`Método de Pago: ${boletaInfo.metodoPago}`, 10, y);
      y += 10;

      // Crear una matriz de datos para la tabla
      const data = [];
      data.push(["Cantidad", "Nombre", "Precio Unitario"]);

      boletaInfo.items.forEach((item) => {
        // Añadir el símbolo de la moneda al precio unitario
        const precioUnitario = `S/.${item.precioUnitario}`;

        data.push([item.cantidad, item.nombreProducto, precioUnitario]);
      });

      // Agregar la tabla al PDF
      doc.autoTable({
        startY: y,
        head: [data[0]], // Títulos de la tabla
        body: data.slice(1), // Datos de la tabla excluyendo los títulos
      });

      doc.text(
        `Total pagado: S/.${boletaInfo.total}`,
        10,
        doc.autoTable.previous.finalY + 10
      );

      // Guarda el PDF con el nombre "Boleta.pdf"
      doc.save("Boleta.pdf");
    }
  };

  const handlePrintFactura = () => {
    const doc = new jsPDF();

    if (facturaInfo) {
      // Define la posición inicial para cada sección
      let y = 10;

      // Define el estilo para el encabezado
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Factura", 10, y);

      // Incrementa la posición vertical
      y += 10;

      // Define el estilo para los detalles de la factura
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Agrega cada detalle de la factura con saltos de línea
      doc.text(`Cliente: ${facturaInfo.clienteNombre}`, 10, y);
      y += 10;

      const direccion = facturaInfo.clienteDireccion || "PRESENCIAL";
      doc.text(`Dirección: ${direccion}`, 10, y);
      y += 10;

      doc.text(`RUC: ${facturaInfo.clienteRUC}`, 10, y);
      y += 10;

      doc.text(`Fecha de Emisión: ${facturaInfo.fechaEmision}`, 10, y);
      y += 10;

      doc.text(`Método de Pago: ${facturaInfo.metodoPago}`, 10, y);
      y += 10;

      // Crear una matriz de datos para la tabla
      const data = [];
      data.push(["Cantidad", "Nombre", "Precio Unitario"]);

      facturaInfo.items.forEach((item) => {
        // Añadir el símbolo de la moneda al precio unitario
        const precioUnitario = `S/.${item.precioUnitario}`;

        data.push([item.cantidad, item.nombreProducto, precioUnitario]);
      });


      // Agregar la tabla al PDF
      doc.autoTable({
        startY: y,
        head: [data[0]], // Títulos de la tabla
        body: data.slice(1), // Datos de la tabla excluyendo los títulos
        theme: "grid"
      });

      doc.text(
        `Total pagado: S/.${facturaInfo.total}`,
        10,
        doc.autoTable.previous.finalY + 10
      );

      // Guarda el PDF con el nombre "Factura.pdf"
      doc.save("Factura.pdf");
    }
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

      <div className="flex flex-wrap gap-4 max-h-[600px] overflow-y-scroll scrollbar-thin">
        {records.map((d, i) => (
          <div
            className="bg-[#F8EEE6] w-fit rounded-lg h-80 overflow-hidden hover:h-[378px] transition-all"
            key={i}
          >
            <div>
              <img
                 src={imagenesPlatos[d?.items[0]?.nombreProducto]}
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
            </div>

            <div className="flex p-2 justify-center gap-5">
              <button
                className="rounded-lg p-2 bg-blue-100 text-blue-700 border-blue-700 border font-medium hover:bg-blue-700 hover:text-white transition-all"
                onClick={() => handleOpenModal(d)}
              >
                Generar Boleta
              </button>
              <button
                className="rounded-lg p-2 bg-blue-100 text-blue-700 border-blue-700 border font-medium hover:bg-blue-700 hover:text-white transition-all"
                onClick={() => handleFacturaModal(d)}
              >
                Generar Factura
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal &&
          selectedPedido &&
          boletaInfo && ( // Verifica si hay un pedido y boleta
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
                <div className="w-fit overflow-hidden rounded-2xl bg-white p-5 text-left shadow-xl text-black">
                  <div className="text-lg font-medium leading-6 text-gray-900 mb-3">
                    Boleta
                  </div>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold mr-1">Cliente:</span>
                      {boletaInfo.clienteNombre}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">Direccion:</span>
                      {boletaInfo?.clienteDireccion || "PRESENCIAL"}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">
                        Fecha de Emisión:
                      </span>
                      {boletaInfo.fechaEmision}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">
                        Método de Pago:
                      </span>
                      {boletaInfo.metodoPago}
                    </p>
                    <div className="flex justify-between">
                      <div className="font-semibold">Productos:</div>
                      <div className="font-semibold">Cantidad:</div>
                      <div className="font-semibold">P/U:</div>
                    </div>

                    {boletaInfo.items.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-300 pb-1 flex justify-between"
                      >
                        <span>{item.nombreProducto}</span>
                        <span>{item.cantidad} </span>
                        <span className="mr-3">{item.precioUnitario}</span>
                      </div>
                    ))}
                    <p className="font-semibold">
                      Total pagado: S/.{boletaInfo.total}
                    </p>
                  </div>
                  <button
                    className="bg-[#DFCCBD] text-yellow-800 p-2 rounded-md border border-yellow-800 mt-4"
                    onClick={handlePrintBoleta}
                  >
                    Imprimir Boleta
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal &&
          selectedPedido &&
          facturaInfo && ( // Verifica si hay un pedido y factura
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
                <div className="w-fit overflow-hidden rounded-2xl bg-white p-5 text-left shadow-xl text-black">
                  <div className="text-lg font-medium leading-6 text-gray-900 mb-2">
                    Factura
                  </div>

                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold mr-1">Cliente:</span>
                      {facturaInfo.clienteNombre}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">Dirección:</span>
                      {facturaInfo?.clienteDireccion || "PRESENCIAL"}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">RUC:</span>
                      {facturaInfo.clienteRUC}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">
                        Fecha de Emisión:
                      </span>
                      :{facturaInfo.fechaEmision}
                    </p>
                    <p>
                      <span className="font-semibold mr-1">
                        Método de Pago:
                      </span>
                      {facturaInfo.metodoPago}
                    </p>
                    <div className="flex justify-between">
                      <div className="font-semibold">Productos:</div>
                      <div className="font-semibold">Cantidad:</div>
                      <div className="font-semibold">P/U:</div>
                    </div>
                    {facturaInfo.items.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-300 pb-1 flex justify-between"
                      >
                        <span>{item.nombreProducto}</span>
                        <span>{item.cantidad} </span>
                        <span className="mr-3">{item.precioUnitario}</span>
                      </div>
                    ))}
                    <p className="font-semibold">
                      Total pagado: S/.{facturaInfo.total}
                    </p>
                  </div>

                  <button
                    className="bg-[#DFCCBD] text-yellow-800 p-2 rounded-md border border-yellow-800 mt-4"
                    onClick={handlePrintFactura}
                  >
                    Imprimir Factura
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default GenBolFac;
