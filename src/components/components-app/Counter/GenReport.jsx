import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiFillInfoCircle,
} from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import authToken from "../../../authToken";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const GenReport = () => {
  //Mensaje de error o exito al realizar pedido:
  const [reportComplete, setReportComplete] = useState(false);
  const [reportError, setReportError] = useState(false);

  //Que la fecha mínima sea la del día actual:
  const [startDate, setStartDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setStartDate(formattedDate);
  }, []);

  //Obtener token de usuario:
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  // Lógica para añadir y eliminar productos
  const handleAgregarProducto = () => {
    const nuevosProductos = [...reporte.producto, { producto: "" }];
    setReporte({ ...reporte, producto: nuevosProductos });
  };

  const handleEliminarProducto = () => {
    if (reporte.producto.length > 1) {
      const nuevosProductos = [...reporte.producto];
      nuevosProductos.splice(-1, 1);
      setReporte({ ...reporte, producto: nuevosProductos });
    }
  };

  const handleProductoChange = (index, e) => {
    const { value } = e.target;
    const nuevosProductos = [...reporte.producto];
    nuevosProductos[index] = value;
    setReporte({ ...reporte, producto: nuevosProductos });
  };

  //Definir formato de pedido:
  const [reporte, setReporte] = useState({
    tipoReporte: "",
    fechaInicio: "",
    fechaCulminacion: "",
    producto: [{ producto: "" }],
  });

  //Manejar los cambios en inputs:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReporte({ ...reporte, [name]: value });
  };

  //Reseteamos valores de los inputs:
  const resetInputValues = (selector, value = "") => {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach((input) => {
      if (input.type === "radio" || input.type === "checkbox") {
        input.checked = false;
      } else if (input.type === "date") {
        input.value = value || ""; // Asigna el valor predeterminado si se proporciona
      } else {
        input.value = value;
      }
    });
  };

  const handleRealizarReporte = async () => {
    //Establecemos el token en el header de axios
    authToken(token);

    const reporteActualizado = { ...reporte };

    console.log(reporteActualizado);

    if (!reporteActualizado.fechaInicio) {
      reporteActualizado.fechaInicio = null;
    }

    if (!reporteActualizado.fechaCulminacion) {
      reporteActualizado.fechaCulminacion = null;
    }

    // Verificar si 'producto' está en el formato no deseado
    if (
      Array.isArray(reporteActualizado.producto) &&
      reporteActualizado.producto.length === 1 &&
      reporteActualizado.producto[0].producto === ""
    ) {
      // Si 'producto' está en el formato no deseado, cambiarlo a un array vacío
      reporteActualizado.producto = [];
    }

    try {
      const response = await axios.post(
        "https://backendcasona-production.up.railway.app/counter/generateReporte",
        reporteActualizado
      );

      // Restablecer valores para los inputs
      // Resetear valores de los inputs
      resetInputValues('input[type="radio"]');
      resetInputValues('input[type="date"]');

      //Si la solicitud es exitosa reestablece los valores
      setReporte({
        tipoReporte: "",
        fechaInicio: "",
        fechaCulminacion: "",
        producto: [{ producto: "" }],
      });

      if (response.data && response.status === 200) {
        setReportComplete(true);
        setTimeout(() => {
          setReportComplete(false);
        }, 3000);
      } else {
        setReportError(true); // Mostrar mensaje de error por datos incorrectos
        setTimeout(() => {
          setReportError(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error al realizar el reporte:", error);
      setReportError(true); // Mostrar mensaje de error
      setTimeout(() => {
        setReportError(false);
      }, 3000);
    }
  };

  return (
    <div
      className="p-4 pl-10 flex flex-col gap-10"
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

      <div>
        <span className="font-semibold text-[26px]">Generar Reporte</span>
        <div className="flex mt-3 gap-20">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="pago"
              name="tipoReporte"
              value="VENTAS"
              onChange={handleInputChange}
            />
            <label className="text-gray-600">Ventas</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="pago"
              name="tipoReporte"
              value="GANANCIAS"
              onChange={handleInputChange}
            />
            <label className="text-gray-600">Ganancias</label>
          </div>
        </div>
      </div>

      <div>
        <span className="font-semibold text-2xl">Detalles del Reporte</span>
        <div className="grid grid-cols-2 mt-3 gap-5">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">
              Fecha de inicio
            </label>
            <input
              type="date"
              min={startDate}
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="fechaInicio"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">
              Fecha de culminación
            </label>
            <input
              type="date"
              min={startDate}
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="fechaCulminacion"
            />
          </div>
        </div>
      </div>

      <div>
        <span className="font-semibold text-2xl">
          Seleccionar productos en específico
        </span>

        <div className="flex mt-3 gap-5 overflow-y-scroll max-h-16 flex-col scrollbar-thin">
          {reporte.producto.map((p, index) => (
            <div className="flex flex-col gap-1 w-full" key={index}>
              <label className="font-medium text-gray-500 text-sm">
                Producto
              </label>
              <select
                className="bg-gray-200 border text-sm rounded-lg p-2 outline-none"
                name="producto"
                value={p.producto}
                onChange={(e) => handleProductoChange(index, e)}
              >
                <option defaultValue>Elija un producto</option>
                <option value="SIMPLE_DE_POLLO">Simple de Pollo</option>
                <option value="CHESSE">Chesse</option>
                <option value="ROYAL">Royal</option>
                <option value="ESPECIAL">Especial</option>
                <option value="MIXTA">Mixta</option>
                <option value="CASONA">Casona</option>
                <option value="CHORIPAN">Choripan</option>
                <option value="CAFE">Cafe</option>
                <option value="INFUSIONES">Infusiones</option>
                <option value="CHICHA_MORADA">Chicha Morada</option>
                <option value="JARRA_CHICHA_MORADA">
                  Jarra de Chicha Morada
                </option>
                <option value="INKA_COLA">Inka Cola</option>
                <option value="COCA_COLA">Coca Cola</option>
                <option value="GUARANA">Guarana</option>
                <option value="AGUA_MINERAL">Agua Mineral</option>
                <option value="CHORIZO">Chorizo</option>
                <option value="HOTDOG">HotDog</option>
                <option value="JAMON">Jamon</option>
                <option value="QUESO">Queso</option>
                <option value="HUEVO">Huevo</option>
                <option value="SALCHIPAPA">Salchipapa</option>
                <option value="SALCHIPOLLO">Salchipollo</option>
              </select>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-2">
          <button
            className="text-sm text-gray-500 hover:border-b hover:font-medium hover:text-black w-fit border-black cursor-pointer"
            onClick={handleAgregarProducto}
          >
            Añadir otro producto...
          </button>

          <button
            className="text-sm text-gray-500 hover:border-b hover:font-medium hover:text-black w-fit border-black cursor-pointer"
            onClick={handleEliminarProducto}
          >
            Eliminar producto...
          </button>
        </div>
      </div>

      <button
        className="absolute bottom-0 right-0 m-4 mr-8 rounded-lg p-2 bg-blue-100 text-blue-700 border-blue-700 border font-medium hover:bg-blue-700 hover:text-white transition-all"
        type="submit"
        onClick={handleRealizarReporte}
      >
        Generar Reporte
      </button>

      <AnimatePresence>
        {reportError && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-700%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="transition duration-300 bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 absolute bottom-10"
          >
            <div className="flex">
              <AiFillInfoCircle className="text-lg" />
              <div className="ms-2">
                <div className="text-sm font-medium">
                  Error al Realizar Reporte.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reportComplete && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-700%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 absolute bottom-10"
          >
            <div className="flex">
              <AiOutlineCheckCircle className="text-lg" />
              <div className="ms-2">
                <div className="text-sm font-medium">
                  Reporte Realizado con Éxito.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenReport;
