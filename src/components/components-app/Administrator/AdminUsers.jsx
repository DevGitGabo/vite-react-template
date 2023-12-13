import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotificationsNone, MdError } from "react-icons/md";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import authToken from "../../../authToken";

const AdminUsers = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;
  //OBTENER USUARIOS CON AXIOS:
  const [records, setRecords] = useState([]);

  useEffect(() => {
    authToken(token);
    axios
      .get("https://backendcasona-production.up.railway.app/admin/getAll")
      .then((res) => {
        setRecords(res.data);
      });
  }, []);

  //ABRIR MODAL:
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    //RESTABLEZCO FORMULARIO PARA QUE AL CAMBIAR ENTRE EDITAR Y AÑADIR NO QUEDEN LOS DATOS DEL MODO EDITAR
    setIsEditing(false);
    setNewUser({ username: "", email: "", password: "", role: "" });
  };

  //Establecer un nuevo usuario:
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // Recolectar y establecer los campos en el usuario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  //Añadir el usuario propiamente dicho tanto en axios como en interfaz:
  const handleSave = () => {
    authToken(token);
    //SI ESTÁ EDITANDO USUARIO:

    if (isEditing) {
      axios
        .put(
          `https://backendcasona-production.up.railway.app/admin/update/${newUser.id}`,
          newUser
        )
        .then((response) => {
          const updatedRecords = records.map((record) =>
            record.id === newUser.id ? response.data : record
          );
          setRecords(updatedRecords);
          setShowModal(false);
          setIsEditing(false);
          // Restablecer el formulario para que al abrir no se mantengan los datos
          setNewUser({ username: "", email: "", password: "", role: "" });
        })
        .catch((error) => {
          console.error("Error al editar el usuario: ", error);
        });
    } else {
      //SI ESTÁ AÑADIENDO USUARIO:

      axios
        .post(
          "https://backendcasona-production.up.railway.app/admin/save",
          newUser
        )
        .then((response) => {
          // Si la creación del usuario es exitosa, actualizamos el estado local
          setRecords([...records, response.data]);
          setShowModal(false);
          // Restablecer el formulario para que al abrir no se mantengan los datos
          setNewUser({ username: "", email: "", password: "", role: "" });
        })
        .catch((error) => {
          // Manejar errores o mostrar un mensaje de error al usuario
          console.error("Error al añadir el usuario: ", error);
        });
    }
  };

  //Eliminar Usuario:
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState({ id: null, username: "" });

  const handleButtonDelete = (id, username) => {
    setShowDeleteModal(true);
    setUserToDelete({ id, username }); // Establecer el ID y nombre del usuario a eliminar
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = (id) => {
    authToken(token);
    // Eliminar la fila en el servidor
    axios
      .delete(
        `https://backendcasona-production.up.railway.app/admin/delete/${id}`
      )
      .then((response) => {
        // Si la eliminación es exitosa, actualizamos el estado local para reflejar el cambio
        const updatedRecords = records.filter((record) => record.id !== id);
        setRecords(updatedRecords);
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario: ", error);
      });
  };

  //Editar Usuario:
  const [isEditing, setIsEditing] = useState(false);

  const openEditModal = (id) => {
    const userToEdit = records.find((user) => user.id === id);

    // Limpiar los corchetes [] del campo role al editar
    const cleanedRole = userToEdit.role.replace(/[\[\]]+/g, "");

    setIsEditing(true);
    setShowModal(true);

    setNewUser({
      ...userToEdit,
      role: cleanedRole, // Asignar el role limpio sin corchetes
    });
  };

  return (
    <div
      className="p-4 pl-10 flex flex-col"
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

      <div className="mt-5">
        <span className="font-semibold text-2xl">Datos de Usuario</span>
      </div>
      <div className="max-h-[270px] overflow-y-scroll scrollbar-thin">
        <div>
          {records.map((d, i) => (
            <div key={i} className="flex items-center justify-between mt-4">
              <div className="items-center gap-3 py-2 flex text-lg ">
                <FaUserCircle className="text-3xl" />
                {d.username}
              </div>
              <div className="flex justify-around gap-5">
                <button
                  className="p-2 border border-yellow-800 rounded-md px-4 bg-[#F8EEE6]  text-yellow-800"
                  onClick={() => openEditModal(d.id)}
                >
                  Editar
                </button>
                <button
                  className="p-2 border border-yellow-800 rounded-md px-4 bg-[#F8EEE6]  text-yellow-800"
                  onClick={() => handleButtonDelete(d.id, d.username)} // Pasar el ID y nombre del usuario al hacer clic
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="rounded-lg relative w-20 h-9 cursor-pointer flex items-center border border-amber-900 bg-amber-900 group hover:bg-amber-900 active:bg-amber-900 active:border-amber-900 overflow-hidden mt-5"
        onClick={handleButtonClick}
      >
        <span className=" text-white ml-4 transform group-hover:translate-x-16 transition-all duration-300">
          Add
        </span>
        <span className="absolute text-white text-xl right-0 h-full w-8 rounded-lg bg-amber-900 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          <BiPlus />
        </span>
      </button>

      <AnimatePresence>
        {showModal && (
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
                  {isEditing ? "Editar Usuario" : "Añadir Usuarios"}
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    className="border rounded-md outline-none p-1.5 pl-2 focus:ring  focus:ring-blue-200 focus:border-blue-300 transition-all"
                    onChange={handleInputChange}
                    name="username"
                    value={newUser.username}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="border rounded-md outline-none p-1.5 pl-2 focus:ring focus:ring-blue-200 focus:border-blue-300 transition-all"
                    onChange={handleInputChange}
                    name="email"
                    value={newUser.email}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="border rounded-md outline-none p-1.5 pl-2 focus:ring focus:ring-blue-200 focus:border-blue-300 transition-all"
                    onChange={handleInputChange}
                    name="password"
                    value={newUser.password}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    className={`border rounded-md outline-none p-1.5 pl-2 focus:ring focus:ring-blue-200 focus:border-blue-300 transition-all ${
                      newUser.role &&
                      newUser.role.toUpperCase() !== "ADMIN" &&
                      newUser.role.toUpperCase() !== "USER" &&
                      newUser.role.toUpperCase() !== "CASHIER" &&
                      newUser.role.toUpperCase() !== "CHEF" &&
                      newUser.role.toUpperCase() !== "COUNTER" &&
                      newUser.role.toUpperCase() !== "DELIVERY" &&
                      newUser.role.toUpperCase() !== "WAITER"
                        ? "focus:ring-pink-300 focus:border-pink-300 border-pink-500" // Agregar clase para el borde en caso de ser inválido
                        : ""
                    }`}
                    onChange={handleInputChange}
                    name="role"
                    value={newUser.role}
                  />
                  {newUser.role &&
                    newUser.role.toUpperCase() !== "ADMIN" &&
                    newUser.role.toUpperCase() !== "USER" &&
                    newUser.role.toUpperCase() !== "CASHIER" &&
                    newUser.role.toUpperCase() !== "CHEF" &&
                    newUser.role.toUpperCase() !== "COUNTER" &&
                    newUser.role.toUpperCase() !== "DELIVERY" &&
                    newUser.role.toUpperCase() !== "WAITER" && (
                      <p className="mt-1 text-pink-600 text-sm">
                        Por favor, ingrese solo los roles aceptados.
                      </p>
                    )}
                </div>
                <div className="mt-4">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSave}
                  >
                    {isEditing ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center"
            onClick={handleCloseDelete}
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
                <div className="flex flex-col items-center justify-center">
                  <MdError className="text-5xl text-red-500 animate-pulse" />
                  <span className="text-lg font-medium leading-6 text-gray-900 mt-3">
                    ¿Seguro que desea eliminar "{userToDelete.username}"?
                  </span>
                  <span className="text-center mt-1">
                    Este usuario se eliminará permanentemente. Esta acción es
                    irreversible.
                  </span>
                </div>
                <div className="flex justify-center gap-6 mt-5">
                  <button
                    className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={handleCloseDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-700"
                    onClick={() => {
                      handleDelete(userToDelete.id); // Llamar a la función handleDelete con el ID del usuario
                      handleCloseDelete(); // Cerrar el modal después de eliminar
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;
