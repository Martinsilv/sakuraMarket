import { useCart } from "./style/context/cartContext";
export const WhatsAppButton = () => {
  const { cart, setCart } = useCart();
  const phoneNumber = "5493794950237"; // Reemplaza con tu número de WhatsApp (sin el +)

  const handleSendWhatsApp = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Crear el mensaje
    let messageText =
      "Hola Sakura 🌸, quisiera realizar la siguiente compra:\n\n";

    // Agregar cada producto
    cart.forEach((item) => {
      messageText += `Producto: ${item.name}\n`;
      messageText += `Cantidad: ${item.quantity}\n`;
      messageText += `Precio: $${item.price}\n\n`;
    });

    // Calcular y agregar el total
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    messageText += `\nTotal: $${totalPrice}`;

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
