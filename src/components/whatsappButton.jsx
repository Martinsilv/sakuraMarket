import { useCart } from "./style/context/cartContext";
export const WhatsAppButton = () => {
  const { cart, setCart } = useCart();
  const phoneNumber = "5493794950237"; // Reemplaza con tu número de WhatsApp (sin el +)

  const handleSendWhatsApp = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Crear el mensajes
    let messageText =
      "Hola Sakura 🌸, quisiera realizar la siguiente compra:\n\n";

    // Agregar cada producto al mensaje con el precio correcto
    cart.forEach((item) => {
      const hasSale =
        item.salePrice !== undefined &&
        item.salePrice !== null &&
        item.salePrice !== "";
      const price = hasSale ? item.salePrice : item.price;

      messageText += `Producto: ${item.name}\n`;
      messageText += `Cantidad: ${item.quantity}\n`;
      messageText += `Precio: $${price}${hasSale ? " (oferta)" : ""}\n\n`;
    });

    // Calcular el total con precios individuales
    const totalPrice = cart.reduce((total, item) => {
      const hasSale =
        item.salePrice !== undefined &&
        item.salePrice !== null &&
        item.salePrice !== "";
      const price = hasSale ? item.salePrice : item.price;

      return total + price * item.quantity;
    }, 0);

    messageText += `Total: $${totalPrice}`;

    // Codificar el mensaje
    const encodedMessage = encodeURIComponent(messageText);

    // Detectar si es móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Usar la URL apropiada según el dispositivo
    const whatsappURL = isMobile
      ? `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, "_blank");

    setTimeout(() => {
      setCart([]);
      localStorage.removeItem("compra-finalizada");
    }, 10000);
  };

  return (
    <button
      onClick={handleSendWhatsApp}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:-translate-y-1 "
    >
      Finalizar Compra
    </button>
  );
};
