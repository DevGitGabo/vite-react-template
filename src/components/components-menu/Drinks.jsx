import React from "react";
import { MdShoppingCart } from "react-icons/md";

const Drinks = () => {
  return (
    <div className="flex flex-wrap justify-between w-full p-1 my-10">
      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\cafe.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Cafe</span>
          <span className="font-medium text-lg">(Taza de café)</span>
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
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\infusiones.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Infusiones</span>
          <span className="font-medium text-lg">(Manzanilla, Té, Anis)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.2.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\vaso-chicha.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Vaso de chicha</span>
          <span className="font-medium text-lg">(Vaso de chicha)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.2.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\jarra-chicha.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Jarra de chicha</span>
          <span className="font-medium text-lg">(Jarra de chicha)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.8.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\inca-coca.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">InkaCola/CocaCola</span>
          <span className="font-medium text-lg">(Gaseosa de 1/2 litro)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.3.50</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\guarana.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Guarana</span>
          <span className="font-medium text-lg">(Gaseosa de 1/2 litro)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold">S/.2.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\fanta.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Fanta</span>
          <span className="font-medium text-lg">(Gaseosa de medio litro)</span>
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
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\agua.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Agua mineral</span>
          <span className="font-medium text-lg">(Botella de 1/2 litro)</span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.2.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drinks;
