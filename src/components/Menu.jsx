import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import Todos from "./components-menu/Todos"; // Asegúrate de ajustar la importación a la ruta correcta
import Hamburgers from "./components-menu/Hamburgers"; // Asegúrate de ajustar la importación a la ruta correcta
import Drinks from "./components-menu/Drinks"; // Asegúrate de ajustar la importación a la ruta correcta
import Plates from "./components-menu/PLates"; // Asegúrate de ajustar la importación a la ruta correcta
import Sides from "./components-menu/Sides";
import Footer from "./Footer";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
  };

  const images = [
    "/src/assets/Imagenes Casona/Menu/Seccion/publicidad_1.jpg",
    "/src/assets/Imagenes Casona/Menu/Seccion/publicidad_2.jpg",
    "/src/assets/Imagenes Casona/Menu/Seccion/publicidad_3.jpg",
    "/src/assets/Imagenes Casona/Menu/Seccion/publicidad_4.jpg",
    "/src/assets/Imagenes Casona/Menu/Seccion/publicidad_5.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <>
      <div className="px-5 py-6">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`slide-${index}`}
                className="w-full h-[500px] object-cover hover:scale-110"
              />
            </div>
          ))}
        </Slider>
      </div>

      <section className="flex flex-col items-center mt-10">
        <h2 className="text-[70px] font-bold text-amber-800">MENÚ</h2>
        <div className="flex gap-2">
          <button
            className={`py-3 px-7 bg-orange-300 font-medium text-sm rounded-md hover:text-white hover:bg-amber-700 ${
              selectedCategory === "Todos" ? "bg-amber-700 text-white" : ""
            }`}
            onClick={() => handleButtonClick("Todos")}
          >
            Todos
          </button>
          <button
            className={`py-3 px-7 bg-orange-300 font-medium text-sm rounded-md hover:text-white hover:bg-amber-700 ${
              selectedCategory === "Hamburgers" ? "bg-amber-700 text-white" : ""
            }`}
            onClick={() => handleButtonClick("Hamburgers")}
          >
            Hamburguesas
          </button>
          <button
            className={`py-3 px-7 bg-orange-300 font-medium text-sm rounded-md hover:text-white hover:bg-amber-700 ${
              selectedCategory === "Drinks" ? "bg-amber-700 text-white" : ""
            }`}
            onClick={() => handleButtonClick("Drinks")}
          >
            Bebidas
          </button>
          <button
            className={`py-3 px-7 bg-orange-300 font-medium text-sm rounded-md hover:text-white hover:bg-amber-700 ${
              selectedCategory === "Plates" ? "bg-amber-700 text-white" : ""
            }`}
            onClick={() => handleButtonClick("Plates")}
          >
            Platos
          </button>
          <button
            className={`py-3 px-7 bg-orange-300 font-medium text-sm rounded-md hover:text-white hover:bg-amber-700 ${
              selectedCategory === "Sides" ? "bg-amber-700 text-white" : ""
            }`}
            onClick={() => handleButtonClick("Sides")}
          >
            Agregados
          </button>
        </div>
      </section>

      {selectedCategory === 'Todos' && <Todos />}
      {selectedCategory === 'Hamburgers' && <Hamburgers />}
      {selectedCategory === 'Drinks' && <Drinks />}
      {selectedCategory === 'Plates' && <Plates />}
      {selectedCategory === 'Sides' && <Sides />}

      <Footer />
    </>
  );
};

export default Menu;
