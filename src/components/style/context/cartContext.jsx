import { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import Swal from "sweetalert2";
import "../../../App.css";

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
              addedAt: now,
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
          image: item.image,
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

  // Revisa cada 10 segundos si algún producto se venció (20 minutos)
  useEffect(() => {
    const expirationTime = 20 * 60 * 1000;

    const interval = setInterval(async () => {
      const now = Date.now();
      const newCart = [];

      for (const product of cartRef.current) {
        const expired = now - product.addedAt > expirationTime;

        if (expired) {
          try {
            const productRef = doc(db, "sakura-products", product.id);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
              const currentStock = productSnap.data().quantity || 0;

              await updateDoc(productRef, {
                quantity: currentStock + product.quantity,
              });
            }

            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "info",
              title: `Producto liberado`,
              html: `Se devolvió "${product.name}" al stock.<strong> Debido a que expiró su tiempo en el carrito.</strong>`,
              imageUrl: product.image,
              imageWidth: 100,
              imageHeight: 100,
              imageAlt: product.name,
              customClass: {
                popup: "custom-toast",
                image: "rounded-full",
              },
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
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
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </cartContext.Provider>
  );
};
