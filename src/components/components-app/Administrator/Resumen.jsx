import React, { useState, useEffect } from "react";
import axios from "axios";
import authToken from "../../../authToken";
import { AiOutlineSearch, AiFillEye, AiFillCheckCircle } from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { BiSolidErrorCircle, BiSolidCommentDetail } from "react-icons/bi";

const ErrorCounter = () => {
    const [errorCount, setErrorCount] = useState(0);
  
    useEffect(() => {
      const handleError = () => {
        setErrorCount((prevCount) => prevCount + 1);
      };
  
      window.addEventListener("error", handleError);
  
      return () => {
        window.removeEventListener("error", handleError);
      };
    }, []);
  
    return (
      <div className="flex bg-red-200 p-3 rounded-md justify-between w-[233px]">
        <div className="flex flex-col">
          <span className="text-[28px] font-semibold">{errorCount}</span>
          <span>Errores Recientes</span>
        </div>
        <BiSolidErrorCircle className="text-[45px] text-red-500" />
      </div>
    );
  };

const Resumen = () => {
  const userInformationString = localStorage.getItem("userInformation");
  const userInformation = JSON.parse(userInformationString);
  const token = userInformation.token;

  const [records, setRecords] = useState([]);

  useEffect(() => {
    authToken(token);
    axios
      .get("https://backendcasona-production.up.railway.app/admin/getAll")
      .then((res) => {
        setRecords(res.data);
      });
  }, []);

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

      <div className="flex flex-col px-5 py-3 bg-white m-4 h-fit rounded-xl w-full max-w-[1020px] mx-auto">
        <span className="font-semibold mb-2">Resumen de datos</span>
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex bg-green-200 p-3 rounded-md justify-between w-[233px]">
            <div className="flex flex-col">
              <span className="text-[28px] font-semibold">
                {records.length}
              </span>
              <span>Usuarios</span>
            </div>
            <AiFillCheckCircle className="text-[45px] text-green-500" />
          </div>

          <div className="flex bg-orange-200 p-3 rounded-md justify-between w-[233px]">
            <div className="flex flex-col">
              <span className="text-[28px] font-semibold">2</span>
              <span>Reseñas</span>
            </div>
            <BiSolidCommentDetail className="text-[45px] text-orange-500" />
          </div>

          <div className="flex bg-purple-200 p-3 rounded-md justify-between w-[233px]">
            <div className="flex flex-col">
              <span className="text-[28px] font-semibold">5</span>
              <span>Vistas Diarias</span>
            </div>
            <AiFillEye className="text-[45px] text-purple-500" />
          </div>

           <ErrorCounter />
        </div>
      </div>
    </div>
  );
};

export default Resumen;
