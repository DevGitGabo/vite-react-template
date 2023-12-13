import Footer from "./Footer";

const Pedidos = () => {
  return (
    <>
      <div className="flex flex-col p-12">
        <h2 className="text-[#5E6282] font-bold text-2xl">Pedidos</h2>
        <h1 className="text-blue-950 font-bold text-[60px]">
          Ofertas y promociones vigentes
        </h1>
        <div className="flex flex-col gap-3 mt-2.5">
          <div className="flex items-center gap-2 text-[#5E6282] font-medium">
            <img
              src="\src\assets\Imagenes Casona\Principal\hamburguesa-con-queso.png"
              alt="Hamburguesas del día"
              className="w-7 h-7"
            />
            <p>Hamburguesas del día</p>
          </div>
          <div className="flex items-center gap-2 text-[#5E6282] font-medium">
            <img
              src="\src\assets\Imagenes Casona\Principal\pastel-de-cumpleanos.png"
              alt="Promoción de cumpleaños"
              className="w-7 h-7"
            />
            <p>Promoción de cumpleaños</p>
          </div>
          <div className="flex items-center gap-2 text-[#5E6282] font-medium">
            <img
              src="\src\assets\Imagenes Casona\Principal\redes-sociales.png"
              alt="2x1 para quienes nos siguen en nuestras redes sociales"
              className="w-7 h-7"
            />
            <p>2x1 para quienes nos siguen en nuestras redes sociales</p>
          </div>
        </div>
      </div>

      <div
        className="p-12 mt-5 flex flex-col items-center"
        style={{
          backgroundImage:
            'url("../src/assets/Imagenes Casona/Principal/fondo-hamburguesas.jpeg")',
        }}
      >
        <h1 className="text-white text-[100px] font-bold">TESTIMONIOS</h1>
        <div className="flex flex-wrap mt-10 w-full max-w-[1920px] mx-auto gap-5">
          <div className="w-[49%] bg-white flex flex-col items-center justify-center rounded-xl">
            <div className="p-5 flex flex-col items-center">
              <p className="text-[20px] text-[#C98A40] font-bold">Gabriel Paiva</p>
              <p className="text-center font-medium text-lg">
                La mejor hamburguesa que he probado en mi vida. La carne estaba
                jugosa y sabrosa, el queso fundía perfectamente y la cebolla
                estaba crujiente. El servicio también fue excelente. El camarero
                fue amable y atento, y nos recomendó la hamburguesa perfecta.
                Sin duda volveré con buenos ojos a La Casona.
              </p>
              <div className="mt-3 text-2xl text-yellow-400">★★★★★</div>
            </div>
          </div>
          <div className="w-[49%] bg-white flex flex-col items-center justify-center rounded-xl">
            <div className="p-5 flex flex-col items-center">
              <p className=" text-[20px] text-[#C98A40] font-bold">Ricardo Villegas</p>
              <p className="text-center font-medium text-lg">
                Celebramos nuestra fiesta en La Hamburguesería y fue una
                experiencia increíble. Las hamburguesas estaban deliciosas y el
                servicio fue excelente. El personal fue muy amable y atento, y
                se aseguraron de que todo fuera perfecto para nosotros. Sin duda
                recomendaría La Hamburguesería para cualquier evento especial.
              </p>
              <div className="mt-3 text-2xl text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pedidos;
