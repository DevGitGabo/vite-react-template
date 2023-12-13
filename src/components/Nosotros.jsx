import Footer from "./Footer";

const Nosotros = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className=" text-6xl text-amber-800 font-bold">Nosotros</div>
        <div className=" text-xl font-bold text-gray-600">Somos “La Casona”</div>
      </div>
      <section className="flex">
        <div className="w-[1000px]">
          <img
            src="\src\assets\Imagenes Casona\Principal\lugar.png"
            alt="Imagen de la empresa"
          />
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
            <div className="p-2 text-justify">
              <h2 className="font-bold text-2xl text-[#0C8EAB] mb-1">1. Vision</h2>
              <p className="font-semibold">
                Nuestra meta es ofrecer a nuestros clientes una experiencia
                gastronómica excepcional, destacando por la calidad, frescura y
                nutrición de nuestros productos de comida rápida. Nos enfocamos
                en satisfacer las necesidades y preferencias de nuestros
                consumidores, proporcionando bienestar y calidad de vida en cada
                bocado. Nos enorgullece brindar una excelente presentación y
                servicio, lo que nos ha permitido consolidarnos como una opción
                preferida por quienes valoran la calidad en su alimentación
                diaria.
              </p>
            </div>
            <div className="p-2 text-justify">
              <h2 className="font-bold text-2xl text-[#0C8EAB] mb-1">2. Mision</h2>
              <p className="font-semibold">
                Aspiramos a ser reconocidos como la empresa líder a nivel
                Distrital en la producción y venta de comidas rápidas. Para
                lograrlo, nos apoyamos en instalaciones equipadas con la última
                tecnología para el manejo de nuestros productos y contamos con
                un equipo altamente capacitado y con nuestro riguroso y estricto
                control de calidad. Buscamos constantemente mejorar nuestros
                procesos y productos para seguir siendo la mejor opción en el
                mercado de comidas rápidas y mantener la confianza y preferencia
                de nuestros clientes.
              </p>
            </div>

            <div className="lg:col-span-2 p-2 text-justify">
              <h2 className="font-bold text-2xl text-[#0C8EAB] mb-1">3. Nuestra Historia</h2>
              <p className="font-semibold">
                En el año 2016, Saida Ciurlizza Álvarez y José Perleche Ramos
                decidieron emprender juntos un negocio de Sanguchería y Snack en
                el Distrito de Reque, al que llamaron "La Casona".
                <br />
                <br />
                El nombre se inspiró en las antiguas casas de la época en la que
                se encontraba el local. En sus inicios, el negocio solo contaba
                con cuatro personas, los dueños, la madre de Saida, Cristina
                Álvarez, y su hermano Calin Ciurlizza. Gracias a la calidad de
                sus productos y la eficiencia en sus ventas, “La Casona”
                rápidamente se hizo conocida y consolidó su reputación como una
                de las mejores hamburgueserías del distrito. Sin embargo, en el
                año 2020, la pandemia obligó a cerrar el negocio durante dos
                años. En el 2021, decidieron invertir en el negocio y demolieron
                el local para construir una nueva casona. Esta vez, estaría
                compuesto por tres locales comerciales y uno principal, donde se
                ubicaría la hamburguesería. En abril del 2022, “La Casona”
                volvió a abrir sus puertas y atrajo no solo a sus antiguos
                clientes de Reque, sino también a clientes de Chiclayo.
                <br />
                <br />
                En la actualidad, “La Casona” es el principal local de
                hamburguesería y Snack en Reque. Además, la pareja de esposos
                tiene dos hijos, María Alejandra Perleche Ciurlizza y Paolo
                Alberto Perleche Ciurlizza, quienes son los futuros herederos
                del negocio familiar.
                <br />
                <br />
              </p>
              <div className="flex gap-2 items-center">
                <button className="rounded-full text-xs bg-yellow-300 font-bold px-4 py-3 border-2 border-black">CONTACTANOS</button>
                <p className=" text-lg font-bold text-blue-400">Mas informacion</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Nosotros;
