import { motion } from "framer-motion";
/* import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Nav } from "./nav";
import imagen1 from "../assets/micaymartin.jpeg";
import imagen3 from "../assets/florDeSakura.png";
import mascota2 from "../assets/mascota2.png";
import imagen2 from "../assets/img11.jpeg";
import { Footer } from "./footer";

const sections = [
  {
    title: "Nosotros",
    text: "Somos Mica y Martín, dos apasionada por los productos asiáticos y las experiencias diferentes. Así nació Sakura Market, un espacio donde lo clásico y lo novedoso se encuentran para sorprenderte cada vez que elegís algo nuestro.Empezamos con snacks, golosinas, bebidas y comidas difíciles de conseguir, y con el tiempo fuimos creciendo gracias a ustedes. Hoy en Sakura Market también vas a encontrar ropa con estilo único, productos de librería kawaii, y una sección de juguetería",
    imgSrc: imagen1,
  },
  {
    title: "Tu Tienda de Productos Importados",
    text: "Desde noviembre de 2024, ofrecemos una gran variedad de productos importados: desde ramen, snacks y bebidas internacionales, hasta artículos de ropa, librería y mucho más. Nos esforzamos día a día para brindarte una experiencia de compra única, con productos de excelente calidad, precios accesibles y entregas rápidas a domicilio, tanto en Corrientes Capital como en todo el país.",
    imgSrc: imagen2,
  },
  {
    title: "Sakura Market",
    text: "El nombre Sakura está inspirado en la flor del cerezo de Japón, un símbolo de belleza y renovación, que representa también lo que queremos que vivas cada vez que elegís nuestra tienda: una experiencia diferente, segura y confiable.",
    imgSrc: imagen3,
  },
];

const QuienesSomos = () => {
  return (
    <div>
      <Nav />

      <div className="bg-gray-50 py-12 px-6 md:px-20 max-w-7xl mx-auto z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Quiénes Somos
        </h2>

        {sections.map((section, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={section.imgSrc}
              alt={section.title}
              className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-xl"
            />

            <div className="mt-6 md:mt-0 md:w-1/2 md:px-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">{section.text}</p>
            </div>
          </motion.section>
        ))}

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Sakura Market
          </h3>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper md:w-4/5"
          >
            {equipoImgs.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`Equipo ${i + 1}`}
                  className="w-full h-96 md:h-80 lg:h-96   object-cover rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div> */}
        <div className="flex justify-center">
          <img
            src={mascota2}
            alt="mascota"
            className="w-72 h-72 rounded-lg  "
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuienesSomos;
