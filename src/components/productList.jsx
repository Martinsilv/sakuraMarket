import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from "./style/context/cartContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
export const ProductList = ({ selectedCategory }) => {
  const [product, setProduct] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const products = collection(db, "sakura-products");

    // Listener para actualizaciones en tiempo real
    const unsubscribe = onSnapshot(products, (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduct(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  const addToCartAlert = (product) => {
    Swal.fire({
      title: "¿Deseas añadir este producto al carrito?",
      text: `Producto: ${product.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#cd5547",
      confirmButtonText: "Sí, añadir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        addToCart(product);
        console.log(`${product.name} añadido al carrito.`);
        Swal.fire(
          "Añadido!",
          "El producto ha sido añadido al carrito.",
          "success"
        );
      }
    });
  };

  // Filtrar productos según la categoría seleccionada
  const filteredProducts =
    selectedCategory === "Todos"
      ? product
      : product.filter((item) => item.category === selectedCategory);

  return (
    <>
      <section id="products-section">
        <div className="m-4 sm:m-6 md:m-8 lg:m-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
          {filteredProducts.map((item) => (
            <div key={item.id} className="flex justify-center">
              <div className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-fit w-full max-w-64 hover:shadow-xl bg-white">
                {item.salePrice ? (
                  <div className=" w-20 h-6 rounded-xl bg-green-600 absolute top-4 left-2 flex items-center justify-center text-white font-bold text-sm">
                    OFERTA
                  </div>
                ) : null}

                <img
                  src={item.image}
                  alt="imageProduct"
                  className="pt-2 px-1 w-full object-cover h-48 sm:h-52 md:h-56 rounded-xl"
                />
                <div className="px-4 sm:px-5 py-4 sm:py-5 flex flex-col">
                  <h2 className="font-semibold w-full max-w-xs truncate text-ellipsis overflow-hidden">
                    {item.name}
                  </h2>
                  <span className="text-sm font-thin opacity-75">
                    {item.quantity === 0
                      ? "Sin stock"
                      : item.quantity === 1
                      ? "Última unidad"
                      : item.quantity < 5
                      ? `Últimas ${item.quantity}`
                      : "En stock"}
                  </span>
                  {item.salePrice ? (
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-gray-500 line-through">
                        ${item.price}
                      </p>
                      <p className="text-xl font-bold text-green-600">
                        ${item.salePrice}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xl font-bold">${item.price}</p>
                  )}

                  <Link
                    to={`/product/${item.id}`}
                    className=" bg-primary-violet rounded-lg h-9 text-white text-base mt-2 flex items-center justify-center hover:bg-purple-500 cursor-pointer"
                  >
                    Ver descripcion
                  </Link>
                  <button
                    className={`bg-primary-violet text-white px-2 py-2 mt-2 rounded-md transition duration-150 ${
                      item.quantity === 0
                        ? "bg-gray-500 cursor-not-allowed"
                        : "hover:bg-purple-400 cursor-pointer"
                    }`}
                    type="button"
                    onClick={() => addToCartAlert(item)}
                    disabled={item.quantity === 0}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
