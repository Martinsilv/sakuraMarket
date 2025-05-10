import { useState, useEffect } from "react";
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
import imagenResponsive3 from "../assets/44.png";
import imagenResponsive4 from "../assets/100.png";
import imagenResponsive5 from "../assets/66.png";
import imagenResponsive6 from "../assets/77.png";
import imagenResponsive7 from "../assets/99.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Carrousel() {
  const [isResponsive, setIsResponsive] = useState(false);

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
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive1}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive4}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive7}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive2}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive5}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive6}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagenResponsive3}
                alt="responsive-banner"
                className="w-screen h-96 object-cover"
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
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen2}
                alt="banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen3}
                alt="banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen4}
                alt="banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen5}
                alt="banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen6}
                alt="banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={imagen7}
                alt="banner"
                className="w-screen h-96 object-cover"
              />
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </>
  );
}
