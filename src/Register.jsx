import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineUnlock,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineCheckCircle,
  AiFillInfoCircle
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);

  //OCULTAR O MOSTRAR CONTRASEÑA:

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const passwordType = showPassword ? "text" : "password";

  //ENVIAR DATOS DEL REGISTRO AL BACKEND(POST):

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backendcasona-production.up.railway.app/auth/register",
        formData
      );

      if (response.data.status === true) {
        setRegistrationComplete(true);
        setTimeout(() => {
          setRegistrationComplete(false);
        }, 3000);
      } else if (response.data.status === false) {
        setRegistrationError(true);
        setTimeout(() => {
          setRegistrationError(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setRegistrationError(true);
      setTimeout(() => {
        setRegistrationError(false);
      }, 3000);
    }
  };

  return (
    <>
      <motion.div
        className="flex"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-[100vh] w-[50%] justify-center items-center relative">
          <div className="bg-transparent p-8 relative w-[444px]">
            <h1 className="text-[60px] text-amber-400 text-center font-Aclonica">
              Registro
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-8 mt-4 flex px-10">
                <input
                  type="text"
                  className="block w-80 py-2.5 px-2 text-sm text-black bg-transparent border rounded-md border-slate-600 appearance-none dark:text-black dark:focus:border-[#009EE2] focus:outline-none focus:ring-0 focus:text-black focus:border-[#009EE2] peer"
                  placeholder=""
                  name="username"
                  value={username}
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
              <div className="relative mb-8 flex mt-4 px-10">
                <input
                  type="email"
                  className="block w-80 py-2.5 px-2 text-sm text-black bg-transparent border rounded-md border-slate-600 appearance-none dark:text-black dark:focus:border-[#009EE2] focus:outline-none focus:ring-0 focus:text-black focus:border-[#009EE2] peer invalid:focus:border-pink-500 invalid:border-pink-500"
                  placeholder=""
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <label
                  htmlFor=""
                  className="absolute bg-white px-2 left-11 text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 origin-[0]  peer-focus:text-[#009EE2] peer-focus:dark:text-[#009EE2] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-invalid:peer-focus:text-pink-500 peer-invalid:text-pink-500"
                >
                  Email
                </label>
                <p className="absolute top-12 left-11 text-transparent peer-invalid:text-pink-600 text-xs transition-all">
                  Porfavor ingrese un email valido.
                </p>
                <AiOutlineMail className="absolute top-4 right-12" />
              </div>
              <div className="relative my-4 flex px-10">
                <input
                  type={passwordType}
                  className="block w-80 py-2.5 px-2 text-sm text-black bg-transparent border rounded-md border-slate-600 appearance-none dark:text-black dark:focus:border-[#009EE2] focus:outline-none focus:ring-0 focus:text-black focus:border-[#009EE2] peer"
                  placeholder=""
                  name="password"
                  value={password}
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
                  Registrar
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
                  ¿Ya tienes una cuenta?
                  <Link to="/Login" className="ml-1 font-semibold">
                    Inicia Sesión
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

        <div className="w-[50%] h-full">
          <img
            src="src\assets\Imagenes Casona\Logos\278188865_110283694981944_1806291709028654045_n.png"
            alt="LoginFondo"
            className="w-full h-screen bg-cover bg-center"
          />
        </div>

        <AnimatePresence>
          {registrationError && (
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
                    Error al registrar Usuario.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {registrationComplete && (
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
                    Usuario registrado con éxito.
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

export default Register;
