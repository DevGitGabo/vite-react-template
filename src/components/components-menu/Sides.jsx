import React from "react";
import { MdShoppingCart } from "react-icons/md";

const Sides = () => {
  return (
    <div className="flex flex-wrap justify-between w-full p-1 my-10">
      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\chorizo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Chorizo</span>
          <span className="font-medium text-lg">
            (Ensalada + papas + chorizo)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.2.50</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\hotdog.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Hotdog</span>
          <span className="font-medium text-lg">
            (Ensalada + papas + hotdog)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.1.50</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\papas.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">PAPAS FRITAS</span>
          <span className="font-medium text-lg">(Porción de papas)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.8.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sides;
