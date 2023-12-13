import React from "react";
import { MdShoppingCart } from "react-icons/md";

const Hamburgers = () => {
  return (
    <div className="flex flex-wrap justify-between w-full p-1 my-10">
      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\simple-pollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">SIMPLE DE POLLO</span>
          <span className="font-medium text-lg">
            (Hamburguesa de pollo + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.5.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\simple.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">SIMPLE DE CARNE</span>
          <span className="font-medium text-lg">
            (Hamburguesa de carne + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.5.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\chesse-pollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Cheese de pollo</span>
          <span className="font-medium text-lg">
            (Hamburguesa de pollo + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.6.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\cheese-carne.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Cheese de carne</span>
          <span className="font-medium text-lg">
            (Hamburguesa de carne + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.6.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\royale-pollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Royale de pollo</span>
          <span className="font-medium text-lg">
            (Hamburguesa de pollo + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.6.50</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\royale-carne.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Royale de carne</span>
          <span className="font-medium text-lg">
            (Hamburguesa de carne + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.6.50</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\especial-pollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Especial de pollo</span>
          <span className="font-medium text-lg">
            (Hamburguesa de pollo + papas + ensalada)
          </span>
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
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\especial-carne.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Especial de carne</span>
          <span className="font-medium text-lg">
            (Hamburguesa de carne + papas + ensalada)
          </span>
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
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\mixta-pollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Mixta de pollo</span>
          <span className="font-medium text-lg">
            (Hamburguesa de pollo + papas + ensalada)
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
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\mixta-carne.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Mixta de carne</span>
          <span className="font-medium text-lg">
            (Hamburguesa de carne + papas + ensalada)
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
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\casona-pollo.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Casona de pollo</span>
          <span className="font-medium text-lg">
            (Hamburguesa de pollo + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.11.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\casona-carne.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Casona de carne</span>
          <span className="font-medium text-lg">
            (Hamburguesa de carne + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.11.00</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>

      <div className="p-8 flex flex-col border rounded-md hover:border-8 hover:border-amber-800 hover:bg-amber-100 m-2">
        <img
          src="\src\assets\Imagenes Casona\Menu\Seccion\menu\choripan.jpg"
          alt=""
          className="w-[380px] h-[220px]"
        />
        <div className="flex flex-col items-center mt-5">
          <span className="text-2xl font-bold">Choripan</span>
          <span className="font-medium text-lg">
            (Hamburguesa de chorizo + papas + ensalada)
          </span>
        </div>
        <div className="flex justify-between mt-5">
          <p className="font-bold text-lg">S/.6.50</p>
          <button className="bg-red-600 text-xl p-3 text-white rounded-lg hover:bg-[#ff0000]">
            <MdShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hamburgers;
