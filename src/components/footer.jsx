import { FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Ubicación */}
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            <span>Argentina, Corrientes Capital</span>
          </div>

          {/* Íconos */}
          <div className="flex space-x-6">
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
      </footer>
    </div>
  );
};
