import { Link } from "react-router-dom";

const Principal = () => {
  return (
    <div className="flex w-full h-screen">
      <div
        className="bg-cover bg-center w-full h-full"
        style={{
          backgroundImage:
            "url('/src/assets/Imagenes Casona/Banners/FondoInicio.png')",
        }}
      ></div>
      <div className="flex flex-col absolute left-20 top-40 text-white">
        <h1 className=" text-[70px] font-semibold">Sabemos lo que te gusta</h1>
        <span className="text-[20px]">
          Ven y prueba las mejores hamburguesas de Reque
        </span>
        <Link to="/Inicio/Menu" className="flex justify-center transition w-40 text-red-300 hover:text-white border border-red-300 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-md px-5 py-2.5 text-center mt-5 dark:border-red-300 dark:text-red-300 dark:hover:text-white dark:hover:bg-red-300 dark:focus:ring-red-300">Ordenar Ahora</Link>
      </div>
    </div>
  );
};

export default Principal;
