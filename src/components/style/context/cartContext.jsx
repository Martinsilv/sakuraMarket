import { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const cartContext = createContext();
export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const cartRef = useRef(cart);

  useEffect(() => {
    cartRef.current = cart;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (item) => {
    const existingProduct = cart.find((prod) => prod.id === item.id);
    const now = Date.now();

    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? {
              ...product,
              quantity: product.quantity + 1,
              addedAt: now, // Reinicia tiempo
            }
          : product
      );
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
          addedAt: now,
        },
      ]);
    }

    try {
      const productRef = doc(db, "sakura-products", item.id);
      await updateDoc(productRef, {
        quantity: item.quantity - 1,
      });
      item.quantity -= 1;
    } catch (error) {
      console.error("Error al actualizar stock:", error);
    }
  };

  // SOLO UNA VEZ, revisa cada 10 segundos
  useEffect(() => {
    const expirationTime = 60 * 60 * 1000; // 1 hora

    const interval = setInterval(async () => {
      const now = Date.now();
      const newCart = [];

      for (const product of cartRef.current) {
        const expired = now - product.addedAt > expirationTime;

        if (expired) {
          try {
            const productRef = doc(db, "sakura-products", product.id);
            await updateDoc(productRef, {
              quantity: product.quantity,
            });

            console.log(`Producto ${product.id} devuelto al stock`);
          } catch (error) {
            console.error("Error al devolver stock:", error);
          }
        } else {
          newCart.push(product);
        }
      }

      if (newCart.length !== cartRef.current.length) {
        setCart(newCart);
      }
    }, 600000); // cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </cartContext.Provider>
  );
};
