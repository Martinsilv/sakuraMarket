import { useCart } from "./style/context/cartContext";
import { useState } from "react";
import Lottie from "lottie-react";
import tuAnimacion from "../assets/succescart.json";
import logo from "../assets/logosakura.jpeg";
export const WhatsAppButton = () => {
  const { cart, setCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const phoneNumber = "5493794950237";

  const handleSendWhatsApp = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Mostrar popup de confirmación
    setShowPopup(true);

    // Preparar mensaje para WhatsApp
    let messageText =
      "Hola Sakura 🌸, quisiera realizar la siguiente compra:\n\n";

    cart.forEach((item) => {
      const hasSale =
        item.salePrice !== undefined &&
        item.salePrice !== null &&
        item.salePrice !== "";
      const price = hasSale ? item.salePrice : item.price;

      messageText += `Producto: ${item.name}\n`;

      if (item.selectedVariant) {
        messageText += `Variante: ${item.selectedVariant}\n`;
      } else {
        if (item.selectedSize) messageText += `Talle: ${item.selectedSize}\n`;
        if (item.selectedColor) messageText += `Color: ${item.selectedColor}\n`;
      }

      messageText += `Cantidad: ${item.quantity}\n`;
      messageText += `Precio unitario: $${price}${
        hasSale ? " (oferta)" : ""
      }\n\n`;
    });

    const totalPrice = cart.reduce((total, item) => {
      const hasSale =
        item.salePrice !== undefined &&
        item.salePrice !== null &&
        item.salePrice !== "";
      const price = hasSale ? item.salePrice : item.price;
      return total + price * item.quantity;
    }, 0);

    messageText += `Total: $${totalPrice}`;

    const encodedMessage = encodeURIComponent(messageText);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappURL = isMobile
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // setTimeout para mostrar popup y luego redirigir
    setTimeout(() => {
      setShowPopup(false);
      window.open(whatsappURL, "_blank");

      // Limpiar carrito y localStorage después de abrir WhatsApp
      setTimeout(() => {
        setCart([]);
        localStorage.removeItem("compra-finalizada");
      }, 1000);
    }, 3000); // 3 segundos de delay
  };

  return (
    <>
      <button
        onClick={handleSendWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:-translate-y-1"
      >
        Finalizar Compra
      </button>

      {/* Popup de confirmación */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto">
              <img src={logo} alt="Logo Sakura" className="rounded-full" />
            </div>
            <div className="mb-4 flex justify-center">
              {/* Placeholder para tu animación Lottie */}
              <Lottie
                animationData={tuAnimacion}
                style={{ width: 96, height: 96 }}
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Muchas gracias por tu compra!
            </h2>

            <p className="text-gray-600 mb-4">
              Serás redirigido a WhatsApp en unos segundos...
            </p>

            {/* Barra de progreso opcional */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full animate-pulse"
                style={{
                  width: "100%",
                  animation: "progress 3s linear forwards",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};
