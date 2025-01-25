import { createContext, useContext, useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig"; // Ajusta la ruta según tu configuración

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  // Estado inicial del carrito desde LocalStorage o un array vacío
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = async (item) => {
    const existingProduct = cart.find((prod) => item.id === prod.id);

    if (existingProduct) {
      // Incrementar cantidad en el carrito
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCart(updatedCart);
    } else {
      // Agregar un nuevo producto al carrito
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    // Reducir stock en Firestore
    try {
      const productRef = doc(db, "sakura-products", item.id);
      await updateDoc(productRef, {
        quantity: item.quantity - 1,
      });

      // Actualizar stock en el producto local
      item.quantity -= 1;
    } catch (error) {
      console.error("Error al actualizar el stock en Firestore:", error);
    }
  };

  // Guardar el carrito en LocalStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </cartContext.Provider>
  );
};
