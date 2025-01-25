import { useEffect } from "react";
import { Nav } from "./nav";
import { useCart } from "./style/context/cartContext";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { WhatsAppButton } from "./whatsappButton";

export const Cart = () => {
  const { cart, setCart } = useCart();

  // Escuchar cambios en Firestore
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
                  stock: updatedProduct.data().quantity, // Sincroniza el stock desde Firestore
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

    if (item.stock > 0) {
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? {
              ...product,
              quantity: product.quantity + 1,
              stock: product.stock - 1,
            }
          : product
      );
      setCart(updatedCart);

      // Actualizar Firestore
      await updateDoc(productRef, { quantity: item.stock - 1 });
    } else {
      alert("No hay más stock disponible.");
    }
  };

  const handleRestar = async (item) => {
    const productRef = doc(db, "sakura-products", item.id);

    if (item.quantity > 1) {
      const updatedCart = cart.map((product) =>
        product.id === item.id
          ? {
              ...product,
              quantity: product.quantity - 1,
              stock: product.stock + 1,
            }
          : product
      );
      setCart(updatedCart);

      // Actualizar Firestore
      await updateDoc(productRef, { quantity: item.stock + 1 });
    }
  };

  const handleDelete = async (item) => {
    const productRef = doc(db, "sakura-products", item.id);

    await updateDoc(productRef, { quantity: item.stock + item.quantity });

    const updatedCart = cart.filter((product) => product.id !== item.id);
    setCart(updatedCart);
  };
  return (
    <div className="bg-gray-200 min-h-screen">
      <Nav />
      {/* Contenedor principal con flex responsivo */}
      <div className="flex flex-col md:flex-row justify-between mt-6">
        {/* Div izquierdo responsivo */}
        <div className="w-full md:m-5 md:w-3/5  flex justify-center flex-wrap gap-5">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row w-4/5 md:w-full h-auto md:h-48 items-center rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                {/* Contenido del carrito */}
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
                      data-ripple-light="true"
                      type="button"
                      className="md:hidden rounded-lg bg-red-500 h-12 py-1 px-3 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md"
                      onClick={() => handleDelete(item)}
                    >
                      Eliminar
                    </button>
                  </div>
                  <p className="block font-sans text-lg font-medium text-gray-600 antialiased">
                    Precio: ${item.price}
                  </p>
                  <p className="block font-sans text-m font-medium text-gray-600 antialiased">
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
                  <p className="block font-sans text-sm text-gray-500 mt-2">
                    Stock disponible: {item.stock}
                  </p>
                  <button
                    data-ripple-light="true"
                    type="button"
                    className="hidden md:block absolute right-4 top-auto rounded-xl bg-red-500 py-2 px-4 text-center align-middle font-sans text-base h-12 font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
        {/* Div derecho responsivo */}
        <div className="w-full md:w-2/5 mt-5 px-4 md:mx-2">
          <div className="flex flex-col items-center bg-white w-full rounded-lg h-auto md:mr-6">
            <p className="text-lg font-semibold font-sans text-gray-700 antialiased pt-4">
              total de la compra
            </p>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-center text-base font-medium w-full"
              >
                <ul className="flex w-4/5 justify-between p-3 border-pink-200 border-b">
                  <li>-{item.name}</li>
                  <li>${item.price * item.quantity}</li>
                </ul>
              </div>
            ))}

            <div className="flex justify-center items-center w-full h-20">
              <p className="text-4xl font-semibold font-sans text-gray-700 antialiased">
                $
                {cart.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
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
