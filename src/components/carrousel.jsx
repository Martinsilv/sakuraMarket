import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../assets/1.png";
import imagen2 from "../assets/2.png";
import imagen3 from "../assets/3.png";
import imagen4 from "../assets/4.png";
import imagen5 from "../assets/5.png";
import imagen6 from "../assets/6.png";
import imagen7 from "../assets/7.png";
import imagenResponsive from "../assets/11.png";
import imagenResponsive1 from "../assets/110.png";
import imagenResponsive2 from "../assets/33.png";
import imagenResponsive3 from "../assets/22.png";
import imagenResponsive4 from "../assets/100.png";
import imagenResponsive5 from "../assets/66.png";
import imagenResponsive6 from "../assets/77.png";
import imagenResponsive7 from "../assets/99.png";
import imagenResponsive8 from "../assets/12.png";
import imagenResponsive9 from "../assets/13.png";
import imagenResponsive10 from "../assets/14.png";
import imagenResponsive11 from "../assets/15.png";
import imagenResponsive12 from "../assets/16.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Carrousel({ links = [] }) {
  const [isResponsive, setIsResponsive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 768); // Cambiar a "responsive" si el ancho es menor o igual a 768px
    };

    // Escuchar cambios en el tamaño de la pantalla
    window.addEventListener("resize", handleResize);

    // Ejecutar una vez al cargar para verificar el tamaño inicial
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageClick = (index) => {
    const link = links[index];
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {isResponsive ? (
          // Si es responsive, mostrar solo la imagen responsive
          <div>
            <SwiperSlide>
              <img
                src={imagenResponsive}
                alt="responsive-banner"
                className={`w-screen h-96 object-cover ${
                  links[0]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(0)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={imagenResponsive9}
                alt="responsive-banner-fanta-china"
                className={`w-screen h-96 object-cover ${
                  links[1]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(1)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={imagenResponsive8}
                alt="responsive-banner-cry-baby"
                className={`w-screen h-96 object-cover ${
                  links[2]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(2)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={imagenResponsive10}
                alt="responsive-banner-smiski"
                className={`w-screen h-96 object-cover ${
                  links[3]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(3)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={imagenResponsive2}
                alt="responsive-banner-ramune"
                className={`w-screen h-96 object-cover ${
                  links[4]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(4)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={imagenResponsive11}
                alt="responsive-banner-grisin-pokemon"
                className={`w-screen h-96 object-cover ${
                  links[5]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(5)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive12}
                alt="responsive-banner-kuromi-sorpresa"
                className={`w-screen h-96 object-cover ${
                  links[6]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(6)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive4}
                alt="responsive-banner-sailormoon"
                className={`w-screen h-96 object-cover ${
                  links[7]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(7)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive7}
                alt="responsive-banner-one-piece"
                className={`w-screen h-96 object-cover ${
                  links[8]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(8)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive3}
                alt="responsive-banner-buldak-pote"
                className={`w-screen h-96 object-cover ${
                  links[9]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(9)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive1}
                alt="responsive-banner"
                className={`w-screen h-96 object-cover ${
                  links[10]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(10)}
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src={imagenResponsive5}
                alt="responsive-banner"
                className={`w-screen h-96 object-cover ${
                  links[11]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(11)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive6}
                alt="responsive-banner"
                className={`w-screen h-96 object-cover ${
                  links[12]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(12)}
              />
            </SwiperSlide>
          </div>
        ) : (
          // Si no es responsive, mostrar las imágenes normales
          <>
            <SwiperSlide>
              <img
                src={imagen}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[0]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(0)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen2}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[1]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(1)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen3}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[2]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(2)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen4}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[3]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(3)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen5}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[4]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(4)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen6}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[5]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(5)}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen7}
                alt="banner"
                className={`w-screen h-96 object-cover ${
                  links[6]
                    ? "cursor-pointer hover:opacity-90 transition-opacity duration-200"
                    : ""
                }`}
                onClick={() => handleImageClick(6)}
              />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  );
}
