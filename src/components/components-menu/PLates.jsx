import React from "react";
import { MdShoppingCart } from "react-icons/md";

const PLates = () => {
  return (
    <div className="flex flex-wrap justify-between w-full p-1 my-10">
      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\salchipapa.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Salchipapa</span>
          <span className="font-medium text-lg">
            (Ensalada + papas + hotdog)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.7.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\salchipollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Salchipollo</span>
          <span className="font-medium text-lg">
            (Ensalada + papas + pollo)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.10.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PLates;
