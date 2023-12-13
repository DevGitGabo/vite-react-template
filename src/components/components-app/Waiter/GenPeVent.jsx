import React from "react";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiFillInfoCircle,
} from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { MdNotificationsNone } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import authToken from "../../../authToken";

const GenPeVent = () => {
  //Obtener Token e ID de usuario:
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;
  const idRegistrador = userInformation?.user?.id;

  //Mensaje de error o exito al realizar pedido:
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderError, setOrderError] = useState(false);

  //AÑADIR O ELIMINAR PRODUCTOS:
  const [productos, setProductos] = useState([{ producto: "", cantidad: "" }]);

  const handleAgregarProducto = () => {
    const nuevosProductos = [...productos, { producto: "", cantidad: "" }];
    setProductos(nuevosProductos);
  };

  const handleEliminarProducto = () => {
    if (productos.length > 1) {
      const nuevosProductos = productos.slice(0, -1);
      setProductos(nuevosProductos);
    }
  };

  const handleProductoChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosProductos = [...productos];
    nuevosProductos[index][name] =
      name === "cantidad" ? parseInt(value, 10) : value;
    setProductos(nuevosProductos);
  };

  //Definir formato de pedido:
  const [pedido, setPedido] = useState({
    idRegistrador: idRegistrador,
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    ruc: "",
    items: [{ producto: "", cantidad: "" }],
    metodoPago: "",
  });

  //Manejar los cambios en inputs:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: value });
  };

  //Al hacer click en Realizar Pedido:
  const handleRealizarPedido = async () => {
    //Establecemos el token en el header de axios
    authToken(token);

    try {
      //formato de array de productos y metodo de pago:
      const pedidoConProductos = {
        ...pedido,
        items: productos.map((producto) => ({
          producto: producto.producto,
          cantidad: producto.cantidad,
        })),
        metodoPago: formaPago,
      };
      // Envío de la solicitud con axios al endpoint correspondiente
      const response = await axios.post(
        "https://backendcasona-production.up.railway.app/waiter/order",
        pedidoConProductos
      );

      console.log("Pedido realizado:", response.data);

      //Aquí reestablecemos los valores del formulario para que esté listo para ingresar un nuevo producto:
      setPedido({
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: "",
        ruc: "",
        items: [{ producto: "", cantidad: "" }],
        metodoPago: "",
      });
      setProductos([{ producto: "", cantidad: "" }]); // Restablecer los productos
      setFormaPago(""); // Esto restablece el estado de los radio buttons

      //Mensaje de Exito o Error:
      if (response.data.status === true) {
        setOrderComplete(true);
        setTimeout(() => {
          setOrderComplete(false);
        }, 3000);
      } else if (response.data.status === false) {
        setOrderError(true);
        setTimeout(() => {
          setOrderError(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error al realizar el pedido:", error);

      setOrderError(true);
      setTimeout(() => {
        setOrderError(false);
      }, 3000);
    }
  };

  //Manejar los radio buttons:
  const [formaPago, setFormaPago] = useState("");

  const radioValuesMap = {
    Yape: "YAPE",
    Plin: "PLIN",
    "Tarjeta de Crédito": "TARJETA",
    Efectivo: "EFECTIVO",
  };

  // Función para manejar el cambio en los radio buttons
  const handleFormaPagoChange = (e) => {
    const { value } = e.target;

    // Transformar el valor seleccionado usando el mapeo
    const transformedValue = radioValuesMap[value];

    // Establecer el valor transformado en el estado
    setFormaPago(transformedValue);
  };

  return (
    <div
      className="p-4 pl-10 flex flex-col gap-5"
      style={{ width: "calc(100% - 256px)" }}
    >
      <div className="absolute flex right-0">
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
        <span className="font-semibold text-2xl">Datos del Cliente</span>
        <div className="grid grid-cols-2 mt-3 gap-5">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">Nombre</label>
            <input
              type="text"
              placeholder="Text"
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="nombre"
              value={pedido.nombre}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Text"
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="apellidos"
              value={pedido.apellidos}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">Correo</label>
            <input
              type="email"
              placeholder="Email"
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="correo"
              value={pedido.correo}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">
              Numero de Telefono
            </label>
            <input
              type="tel"
              placeholder="000-000-000"
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="telefono"
              value={pedido.telefono}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-500 text-sm">RUC</label>
            <input
              type="text"
              placeholder="text"
              className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
              onChange={handleInputChange}
              name="ruc"
              value={pedido.ruc}
            />
          </div>
        </div>
      </div>

      <div>
        <span className="font-semibold text-2xl">Datos del Pedido</span>
        <div className="overflow-y-scroll max-h-20">
          {productos.map((producto, index) => (
            <div key={index} className="flex mt-3 gap-5">
              <div className="flex flex-col gap-1 w-3/4">
                <label className="font-medium text-gray-500 text-sm">
                  Producto
                </label>
                <select
                  className="bg-gray-200 border text-sm rounded-lg p-2 outline-none"
                  name="producto"
                  value={producto.producto}
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
              <div className="flex flex-col gap-1 w-1/4">
                <label className="font-medium text-gray-500 text-sm">
                  Cantidad
                </label>
                <input
                  type="number"
                  className="p-2 py-2.5 outline-none bg-gray-200 rounded-md text-sm"
                  name="cantidad"
                  value={producto.cantidad}
                  onChange={(e) => handleProductoChange(index, e)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className=" text-sm text-gray-500  hover:border-b hover:font-medium hover:text-black w-fit border-black cursor-pointer"
          onClick={handleAgregarProducto}
        >
          Añadir otro producto...
        </button>

        <button
          className=" text-sm text-gray-500  hover:border-b hover:font-medium hover:text-black w-fit border-black cursor-pointer"
          onClick={handleEliminarProducto}
        >
          Eliminar producto...
        </button>
      </div>

      <div>
        <span className="font-semibold text-2xl">Forma de Pago</span>
        <div className="flex mt-3 gap-20">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="pago"
              name="formaPago"
              value="Yape"
              checked={formaPago === "YAPE"}
              onChange={handleFormaPagoChange}
            />
            <label className="text-gray-600">Yape</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="pago"
              name="formaPago"
              value="Plin"
              checked={formaPago === "PLIN"}
              onChange={handleFormaPagoChange}
            />
            <label className="text-gray-600">Plin</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="pago"
              name="formaPago"
              value="Tarjeta de Crédito"
              checked={formaPago === "TARJETA"}
              onChange={handleFormaPagoChange}
            />
            <label className="text-gray-600">Tarjeta de Crédito</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="pago"
              name="formaPago"
              value="Efectivo"
              checked={formaPago === "EFECTIVO"}
              onChange={handleFormaPagoChange}
            />
            <label className="text-gray-600">Efectivo</label>
          </div>
        </div>
      </div>
      <button
        className="absolute bottom-0 right-0 m-4 mr-8 rounded-lg p-2 bg-blue-100 text-blue-700 border-blue-700 border font-medium hover:bg-blue-700 hover:text-white transition-all"
        type="submit"
        onClick={handleRealizarPedido}
      >
        Realizar pedido
      </button>

      <AnimatePresence>
        {orderError && (
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
                  Error al Realizar Pedido.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderComplete && (
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
                  Pedido Realizado con Éxito.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenPeVent;
