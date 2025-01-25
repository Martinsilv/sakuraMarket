import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./style/context/cartContext";

export const AddToCart = () => {
  const { cart } = useCart();
  const [cartCount, setCartcount] = useState(0);
  const navigate = useNavigate();
  const goToCart = () => {
    // Lógica para navegar al carrito
    console.log("Ir al carrito");

    navigate("/cart");
  };

  // Actualiza el contador cuando el carrito cambia
  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartcount(totalItems);
  }, [cart]);
  return (
    <div className="relative">
      <button onClick={goToCart} className="flex items-center justify-center">
        <lord-icon
          src="https://cdn.lordicon.com/mfmkufkr.json"
          trigger="hover"
          colors="primary:#e290a1"
          style={{ width: "50px", height: "50px" }}
        ></lord-icon>
      </button>
      {/* Contador */}
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-pink text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};
