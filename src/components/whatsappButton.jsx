import { useCart } from "./style/context/cartContext";

export const WhatsAppButton = () => {
  const { cart, setCart } = useCart();
  const phoneNumber = "5493794950237";

  const handleSendWhatsApp = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

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

    window.open(whatsappURL, "_blank");

    // Limpiar carrito y localStorage después de 10 segundos
    setTimeout(() => {
      setCart([]);
      localStorage.removeItem("compra-finalizada");
    }, 10000);
  };

  return (
    <button
      onClick={handleSendWhatsApp}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform duration-200 hover:-translate-y-1"
    >
      Finalizar Compra
    </button>
  );
};
