import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import mascota1 from "../assets/mascota.png";
export const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white p-6 ">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
          {/* Ubicación */}
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            <span>Argentina, Corrientes Capital</span>
          </div>

          {/* Íconos */}
          <div className="flex  space-x-6 lg:pl-16">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/sakuramarket_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 text-2xl"
            >
              <FaInstagram />
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/5493794950237" // Reemplaza con tu número de WhatsApp
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 text-2xl"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* Derechos reservados */}
          <p className="text-center">
            Sakura Market - Todos los derechos reservados
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src={mascota1} alt="mascota1" className="w-36 h-36" />
        </div>
      </footer>
    </div>
  );
};
