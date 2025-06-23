import { useEffect } from "react";
import { Nav } from "./nav";
import { useCart } from "./style/context/cartContext";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { WhatsAppButton } from "./whatsappButton";

export const Cart = () => {
  const { cart, setCart } = useCart();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "sakura-products"),
      (snapshot) => {
        setCart((prevCart) =>
          prevCart.map((product) => {
            const updatedProduct = snapshot.docs.find(
              (doc) => doc.id === product.id
            );
            return updatedProduct
              ? {
                  ...product,
                  stock: updatedProduct.data().quantity,
                }
              : product;
          })
        );
      }
    );

    return () => unsubscribe();
  }, [setCart]);

  const handleSumar = async (item) => {
    const productRef = doc(db, "sakura-products", item.id);
    const productSnap = await getDoc(productRef);
    const productData = productSnap.data();

    if (item.selectedVariant && productData.variants) {
      const currentStock = productData.variants[item.selectedVariant];
      if (currentStock > 0) {
        const updatedCart = cart.map((product) =>
          product.id === item.id &&
          product.selectedVariant === item.selectedVariant
            ? {
                ...product,
                quantity: product.quantity + 1,
                stock: currentStock - 1,
              }
            : product
        );
        setCart(updatedCart);
        await updateDoc(productRef, {
          [`variants.${item.selectedVariant}`]: currentStock - 1,
        });
      } else {
        alert("No hay más stock disponible para esta variante.");
      }
    } else if (
      item.selectedSize &&
      item.selectedColor &&
      productData.variants
    ) {
      const currentStock =
        productData.variants[item.selectedSize][item.selectedColor];
      if (currentStock > 0) {
        const updatedCart = cart.map((product) =>
          product.id === item.id &&
          product.selectedSize === item.selectedSize &&
          product.selectedColor === item.selectedColor
            ? {
                ...product,
                quantity: product.quantity + 1,
                stock: currentStock - 1,
              }
            : product
        );
        setCart(updatedCart);

        await updateDoc(productRef, {
          [`variants.${item.selectedSize}.${item.selectedColor}`]:
            currentStock - 1,
        });
      } else {
        alert("No hay más stock disponible para esta variante.");
      }
    } else {
      if (item.stock > 0) {
        const updatedCart = cart.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity + 1,
                stock: item.stock - 1,
              }
            : product
        );
        setCart(updatedCart);
        await updateDoc(productRef, { quantity: item.stock - 1 });
      } else {
        alert("No hay más stock disponible.");
      }
    }
  };

  const handleRestar = async (item) => {
    const productRef = doc(db, "sakura-products", item.id);
    const productSnap = await getDoc(productRef);
    const productData = productSnap.data();

    if (item.quantity > 1) {
      if (item.selectedVariant && productData.variants) {
        const currentStock = productData.variants[item.selectedVariant];
        const updatedCart = cart.map((product) =>
          product.id === item.id &&
          product.selectedVariant === item.selectedVariant
            ? {
                ...product,
                quantity: product.quantity - 1,
                stock: currentStock + 1,
              }
            : product
        );
        setCart(updatedCart);
        await updateDoc(productRef, {
          [`variants.${item.selectedVariant}`]: currentStock + 1,
        });
      } else if (
        item.selectedSize &&
        item.selectedColor &&
        productData.variants
      ) {
        const currentStock =
          productData.variants[item.selectedSize][item.selectedColor];
        const updatedCart = cart.map((product) =>
          product.id === item.id &&
          product.selectedSize === item.selectedSize &&
          product.selectedColor === item.selectedColor
            ? {
                ...product,
                quantity: product.quantity - 1,
                stock: currentStock + 1,
              }
            : product
        );
        setCart(updatedCart);

        await updateDoc(productRef, {
          [`variants.${item.selectedSize}.${item.selectedColor}`]:
            currentStock + 1,
        });
      } else {
        const updatedCart = cart.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity - 1,
                stock: item.stock + 1,
              }
            : product
        );
        setCart(updatedCart);
        await updateDoc(productRef, { quantity: item.stock + 1 });
      }
    }
  };

  const handleDelete = async (item) => {
    const productRef = doc(db, "sakura-products", item.id);
    const productSnap = await getDoc(productRef);
    const productData = productSnap.data();

    if (item.selectedVariant && productData.variants) {
      const currentStock = productData.variants[item.selectedVariant];
      await updateDoc(productRef, {
        [`variants.${item.selectedVariant}`]: currentStock + item.quantity,
      });
    } else if (
      item.selectedSize &&
      item.selectedColor &&
      productData.variants
    ) {
      const currentStock =
        productData.variants[item.selectedSize][item.selectedColor];
      await updateDoc(productRef, {
        [`variants.${item.selectedSize}.${item.selectedColor}`]:
          currentStock + item.quantity,
      });
    } else {
      await updateDoc(productRef, { quantity: item.stock + item.quantity });
    }

    const updatedCart = cart.filter((product) => {
      if (item.selectedVariant) {
        return !(
          product.id === item.id &&
          product.selectedVariant === item.selectedVariant
        );
      } else if (item.selectedSize && item.selectedColor) {
        return !(
          product.id === item.id &&
          product.selectedSize === item.selectedSize &&
          product.selectedColor === item.selectedColor
        );
      } else {
        return product.id !== item.id;
      }
    });

    setCart(updatedCart);
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <Nav />
      <div className="flex flex-col md:flex-row justify-between mt-6 lg:pt-24">
        <div className="w-full md:m-5 md:w-3/5 flex justify-center flex-wrap gap-5">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${item.selectedVariant}`}
                className="relative flex flex-col md:flex-row w-4/5 md:w-full h-auto md:h-48 items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                <div className="w-full h-72 md:w-48 md:h-48 overflow-hidden rounded-t-xl md:rounded-l-xl bg-blue-gray-500 bg-gradient-to-r from-blue-500 to-blue-600">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-4 w-full">
                  <div className="flex justify-between items-center">
                    <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {item.name}
                    </h5>
                    <button
                      type="button"
                      className="md:hidden rounded-lg bg-red-500 h-12 py-1 px-3 text-sm font-bold uppercase text-white shadow-md"
                      onClick={() => handleDelete(item)}
                    >
                      Eliminar
                    </button>
                  </div>

                  {/* Mostrar variante o talle+color */}
                  {item.selectedVariant ? (
                    <p className="text-sm text-gray-500">
                      Variante: {item.selectedVariant}
                    </p>
                  ) : item.selectedSize && item.selectedColor ? (
                    <p className="text-sm text-gray-500">
                      Talle: {item.selectedSize} - Color: {item.selectedColor}
                    </p>
                  ) : null}

                  <p className="text-lg font-medium text-gray-600">
                    Precio: ${item.salePrice ?? item.price}
                  </p>

                  <p className="text-m font-medium text-gray-600">
                    Cantidad en el carrito:
                  </p>

                  <div className="flex items-center">
                    <button
                      className="bg-primary-violet text-white px-2 py-2 mt-2 rounded-md transition duration-150"
                      onClick={() => handleRestar(item)}
                    >
                      -
                    </button>
                    <p className="px-6 font-medium text-m">{item.quantity}</p>
                    <button
                      className="bg-primary-violet text-white px-2 py-2 mt-2 rounded-md transition duration-150"
                      onClick={() => handleSumar(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="hidden md:block absolute right-4 top-auto rounded-xl bg-red-500 py-2 px-4 text-base h-12 font-bold uppercase text-white shadow-md"
                    onClick={() => handleDelete(item)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-semibold text-gray-700">
              No hay productos en el carrito.
            </p>
          )}
        </div>

        {/* RESUMEN DERECHO */}
        <div className="w-full md:w-2/5 mt-5 px-4 md:mx-2">
          <div className="flex flex-col items-center bg-white w-full rounded-lg h-auto md:mr-6">
            <p className="text-lg font-semibold text-gray-700 pt-4">
              Total de la compra
            </p>

            {cart.map((item) => {
              const price = item.salePrice ?? item.price;
              return (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${item.selectedVariant}-resumen`}
                  className="flex justify-center text-base font-medium w-full"
                >
                  <ul className="flex w-4/5 justify-between p-3 border-pink-200 border-b">
                    <li>
                      -{item.name}
                      {item.selectedVariant ? (
                        <span className="block text-xs text-gray-500">
                          Variante: {item.selectedVariant}
                        </span>
                      ) : item.selectedSize && item.selectedColor ? (
                        <span className="block text-xs text-gray-500">
                          Talle: {item.selectedSize} - Color:{" "}
                          {item.selectedColor}
                        </span>
                      ) : null}
                    </li>
                    <li>${price * item.quantity}</li>
                  </ul>
                </div>
              );
            })}

            <div className="flex justify-center items-center w-full h-20">
              <p className="text-4xl font-semibold text-gray-700">
                $
                {cart.reduce((total, item) => {
                  const price = item.salePrice ?? item.price;
                  return total + price * item.quantity;
                }, 0)}
              </p>
            </div>

            <div className="pb-4">
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
