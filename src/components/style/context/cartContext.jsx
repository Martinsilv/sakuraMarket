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
    const now = Date.now();

    const existingProduct = cart.find(
      (prod) =>
        prod.id === item.id &&
        prod.selectedSize === item.selectedSize &&
        prod.selectedColor === item.selectedColor &&
        prod.selectedVariant === item.selectedVariant
    );

    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product.id === item.id &&
        product.selectedSize === item.selectedSize &&
        product.selectedColor === item.selectedColor &&
        product.selectedVariant === item.selectedVariant
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
      const productSnap = await getDoc(productRef);
      const productData = productSnap.data();

      if (productData.variants) {
        const isSimple =
          typeof Object.values(productData.variants)[0] === "number";

        if (isSimple && item.selectedVariant) {
          const currentQty = productData.variants[item.selectedVariant];
          await updateDoc(productRef, {
            [`variants.${item.selectedVariant}`]: currentQty - 1,
          });
        } else if (item.selectedSize && item.selectedColor) {
          const currentQty =
            productData.variants[item.selectedSize][item.selectedColor];
          await updateDoc(productRef, {
            [`variants.${item.selectedSize}.${item.selectedColor}`]:
              currentQty - 1,
          });
        }
      } else {
        await updateDoc(productRef, {
          quantity: item.quantity - 1,
        });
        item.quantity -= 1;
      }
    } catch (error) {
      console.error("Error al actualizar stock:", error);
    }
  };

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
              const data = productSnap.data();

              if (data.variants) {
                const isSimple =
                  typeof Object.values(data.variants)[0] === "number";

                if (isSimple && product.selectedVariant) {
                  const currentQty =
                    data.variants[product.selectedVariant] || 0;
                  await updateDoc(productRef, {
                    [`variants.${product.selectedVariant}`]:
                      currentQty + product.quantity,
                  });
                } else if (product.selectedSize && product.selectedColor) {
                  const currentQty =
                    data.variants[product.selectedSize][product.selectedColor];
                  await updateDoc(productRef, {
                    [`variants.${product.selectedSize}.${product.selectedColor}`]:
                      currentQty + product.quantity,
                  });
                }
              } else {
                const currentStock = data.quantity || 0;
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
            }
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
