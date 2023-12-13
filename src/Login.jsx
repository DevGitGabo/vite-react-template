import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineUnlock,
  AiOutlineLock,
  AiFillInfoCircle,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import axios from "axios";
import authToken from "./authToken";

const Login = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false); // Estado para controlar la visibilidad del mensaje de error

  //OCULTAR O MOSTRAR CONTRASEÑA:

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const passwordType = showPassword ? "text" : "password";

  //ENVIAR SOLICITUD AL BACKEND(POST):

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend para autenticación
      const response = await axios.post(
        "https://backendcasona-production.up.railway.app/auth/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      // Aquí podrías manejar la respuesta del backend (por ejemplo, guardar el token)
      const userInformation = response.data; // Contiene token, username y más
      localStorage.setItem("userInformation", JSON.stringify(userInformation));

      authToken(userInformation.token); // Configura el token en los headers de Axios
      
      navigate("/Panel")
    } catch (error) {
      // Manejar errores, como credenciales incorrectas
      console.error("Error al iniciar sesión:", error);
      setShowError(true); // Mostrar mensaje de error
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <>
      <motion.div
        className="flex"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: window.innerWidth }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-[50%] h-screen">
          <img
            src="src\assets\Imagenes Casona\Menu\Fondo_Login.jpg"
            alt="LoginFondo"
            className="w-full h-full bg-cover bg-center"
          />
        </div>

        <div className="flex h-[100vh] w-[50%] justify-center items-center relative">
          <div className="bg-transparent p-8 relative w-[444px]">
            <h1 className="text-[60px] text-amber-400 text-center font-Aclonica">
              Bienvenido
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-8 mt-4 flex px-10">
                <input
                  type="text"
                  className="block w-80 py-2.5 px-2 text-sm text-black bg-transparent border rounded-md border-slate-600 appearance-none dark:text-black dark:focus:border-[#009EE2] focus:outline-none focus:ring-0 focus:text-black focus:border-[#009EE2] peer"
                  placeholder=""
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <label
                  htmlFor=""
                  className="absolute bg-white px-2 left-11 text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0]  peer-focus:text-[#009EE2] peer-focus:dark:text-[#009EE2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Usuario
                </label>
                <BiUser className="absolute top-4 right-12" />
              </div>
              <div className="relative my-4 flex px-10">
                <input
                  type={passwordType}
                  className="block w-80 py-2.5 px-2 text-sm text-black bg-transparent border rounded-md border-slate-600 appearance-none dark:text-black dark:focus:border-[#009EE2] focus:outline-none focus:ring-0 focus:text-black focus:border-[#009EE2] peer"
                  placeholder=""
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  htmlFor=""
                  className="absolute bg-white px-2 text-sm left-11 text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#009EE2] peer-focus:dark:text-[#009EE2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Contraseña
                </label>
                {showPassword ? (
                  <AiOutlineUnlock
                    className="absolute top-4 right-12 cursor-pointer"
                    onMouseUp={handleMouseUp}
                  />
                ) : (
                  <AiOutlineLock
                    className="absolute top-4 right-12 cursor-pointer"
                    onMouseDown={handleMouseDown}
                  />
                )}
              </div>
              <div className="flex justify-end items-center">
                <Link to="" className="text-slate-600 text-sm pr-10">
                  Olvide Contraseña
                </Link>
              </div>
              <div className="w-full flex items-center justify-center mb-4">
                <button
                  className="w-28 text-[15px] mt-6 rounded-md bg-amber-400 text-white hover:bg-white hover:text-amber-400 hover:border-amber-400 border border-white py-2 transition-colors duration-300"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="w-16 h-px bg-gray-300 rounded-full"></div>
                <span className="pb-1 px-2">o</span>
                <div className="w-16 h-px bg-gray-300 rounded-full"></div>
              </div>
              <div>
                <div className="flex w-full justify-center my-6">
                  <button className="bg-[#E7F2F5] h-12 w-24 flex items-center justify-center rounded-md transform transition-transform hover:scale-110">
                    <FcGoogle className="text-[24px]" />
                  </button>
                  <button className="bg-[#E7F2F5] w-24 flex items-center justify-center rounded-md mx-3 transform transition-transform hover:scale-110">
                    <BsFacebook className="text-[24px] text-blue-600" />
                  </button>
                  <button className="bg-[#E7F2F5] w-24 flex items-center justify-center rounded-md transform transition-transform hover:scale-110">
                    <BsApple className="text-[24px]" />
                  </button>
                </div>
                <span className="text-sm justify-center flex">
                  ¿No tienes una cuenta?
                  <Link to="/Register" className="ml-1 font-semibold">
                    Registrate Ahora
                  </Link>
                </span>
              </div>
            </form>
          </div>
          <div className="absolute right-0 bottom-0">
            <img src="src\assets\Group 688.svg" alt="" />
          </div>

          <div className="absolute left-0 bottom-0">
            <img src="src\assets\Vector.svg" alt="" />
          </div>
        </div>

        <AnimatePresence>
          {showError && (
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
                    Error al Iniciar Sesión.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Login;
