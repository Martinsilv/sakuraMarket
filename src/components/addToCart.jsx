import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./style/context/cartContext";

export const AddToCart = () => {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const [playAnimation, setPlayAnimation] = useState(false);
  const iconRef = useRef(null);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > cartCount) {
      setPlayAnimation(true);
      setTimeout(() => {
        setPlayAnimation(false);
      }, 1000); // Duración de la animación
    }

    setCartCount(totalItems);
  }, [cart]);

  return (
    <div className="relative">
      <button onClick={goToCart} className="flex items-center justify-center">
        <lord-icon
          ref={iconRef}
          src="https://cdn.lordicon.com/mfmkufkr.json"
          trigger={playAnimation ? "loop" : "none"} // ❌ No más hover
          colors="primary:#e290a1"
          style={{ width: "40px", height: "40px" }}
        ></lord-icon>
      </button>

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-pink text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </div>
  );
};
