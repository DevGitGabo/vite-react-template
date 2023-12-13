import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsFillSendFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-black text-white">
      <div className="flex justify-between p-3">
        <div className="flex items-center">
          <a>
            <img src="\src\assets\Imagenes Casona\Logos\LogoCasona.png" />
          </a>
        </div>
        <p className="font-semibold">
          Suscríbete y recibe consejos y tutoriales para el hogar, <br />
          publicidad y promociones comerciales directamente en tu <br />
          e-mail.
        </p>
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            id="ingresa-corre"
            placeholder="Ingresa tu correo"
            className="text-black p-1 rounded-md outline-none pl-2"
          />
          <button
            type="submit"
            className="flex p-1 bg-orange-600 rounded-md items-center gap-1"
          >
            <BsFillSendFill /> Enviar
          </button>
        </div>
      </div>

      <div className=" w-11/12 bg-white h-1 flex self-center"></div>
      <div className="flex flex-col items-center">
        <div className="flex mt-6 gap-5 text-3xl text-black">
          <div className="bg-white p-3 rounded-full group hover:bg-black cursor-pointer transition-all">
            <BsFacebook className="group-hover:text-white transition-all"/>
          </div>
          <div className="bg-white p-3 rounded-full group hover:bg-black transition-all cursor-pointer">
            <BsTwitter className="group-hover:text-white transition-all" />
          </div>
          <div className="bg-white p-3 rounded-full group hover:bg-black transition-all cursor-pointer">
            <BsInstagram className="group-hover:text-white transition-all"/>
          </div>
        </div>

        <div className="flex gap-10 font-semibold text-lg my-14">
          <Link to="/Inicio/Principal" className="hover:text-orange-500 transition-all">Inicio</Link>
          <Link to="/Inicio/Menu" className="hover:text-orange-500 transition-all">Menú</Link>
          <Link to="/Inicio/Pedidos" className="hover:text-orange-500 transition-all">Pedidos</Link>
          <Link to="/Inicio/Nosotros" className="hover:text-orange-500 transition-all">Acerca de Nosotros</Link>
        </div>

        <div className="mb-5 text-lg text-gray-300 font-medium">
          <p>Copyright &copy;2023; Derechos Reservados: Curso Integrador I</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
