import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from "./style/context/cartContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import loaderAnimation from "../assets/Animation-11.json";
import Lottie from "lottie-react";
import arrowUp from "../assets/flecha-arriba.png";

export const ProductList = ({ selectedCategory }) => {
  const [product, setProduct] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("default");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const products = collection(db, "sakura-products");

    const unsubscribe = onSnapshot(products, (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduct(updatedProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isHalfScrolled = window.scrollY > 1300;
      setShowScrollTop(isHalfScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

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
        Swal.fire(
          "Añadido!",
          "El producto ha sido añadido al carrito.",
          "success"
        );
      }
    });
  };

  const handleCard = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredByCategory =
    selectedCategory === "Todos"
      ? product
      : product.filter((item) => item.category === selectedCategory);

  const filteredAndSortedProducts = [...filteredByCategory]
    .filter((item) => {
      if (filterOption === "stock") {
        if (item.variants) {
          return Object.values(item.variants).some((v) =>
            typeof v === "number"
              ? v > 0
              : Object.values(v).some((qty) => qty > 0)
          );
        }
        return item.quantity > 0;
      }
      if (filterOption === "on-sale") return !!item.salePrice;
      return true;
    })
    .sort((a, b) => {
      if (filterOption === "price-asc") {
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      }
      if (filterOption === "price-desc") {
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      }
      if (filterOption === "az") {
        return a.name.localeCompare(b.name);
      }
      if (filterOption === "za") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    })
    .sort((a, b) => {
      const hasStock = (p) => {
        if (p.variants) {
          return Object.values(p.variants).some((v) =>
            typeof v === "number"
              ? v > 0
              : Object.values(v).some((qty) => qty > 0)
          );
        }
        return p.quantity > 0;
      };
      return (hasStock(b) ? 1 : 0) - (hasStock(a) ? 1 : 0);
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie animationData={loaderAnimation} loop className="w-32 h-32" />
      </div>
    );
  }

  return (
    <div className="pt-10">
      <section>
        <div className="flex justify-center mb-4">
          <select
            className="border-2 border-primary-violerHover px-3 py-2 -mt-10 rounded-md text-base md:w-1/4 w-2/3 focus:outline-none focus:border-primary-violerHover"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="default">Ordenar por...</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="stock">Solo con stock</option>
            <option value="on-sale">Solo en oferta</option>
          </select>
        </div>

        <div className="m-4 sm:m-6 md:m-8 lg:m-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
          {filteredAndSortedProducts.map((item) => (
            <div key={item.id} className="flex justify-center">
              <div
                onClick={() => handleCard(item.id)}
                className="transform transition duration-300 hover:scale-105 rounded-lg shadow-lg h-fit w-full max-w-64 hover:shadow-xl bg-white relative"
              >
                {item.salePrice && (
                  <div className="absolute w-20 h-6 rounded-xl bg-green-600 top-4 left-2 flex items-center justify-center text-white font-bold text-sm">
                    OFERTA
                  </div>
                )}

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
                    {(() => {
                      if (item.variants) {
                        const hasStock = Object.values(item.variants).some(
                          (v) =>
                            typeof v === "number"
                              ? v > 0
                              : Object.values(v).some((qty) => qty > 0)
                        );
                        return hasStock ? "En stock" : "Sin stock";
                      }
                      return item.quantity === 0
                        ? "Sin stock"
                        : item.quantity === 1
                        ? "Última unidad"
                        : item.quantity < 5
                        ? `Últimas ${item.quantity}`
                        : "En stock";
                    })()}
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

                  <button
                    className={`bg-primary-violet text-white px-2 py-2 mt-2 rounded-md transition duration-150 ${
                      item.variants
                        ? "hover:bg-purple-400"
                        : item.quantity === 0
                        ? "bg-slate-500 cursor-not-allowed"
                        : "hover:bg-purple-400 cursor-pointer"
                    }`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.variants) {
                        handleCard(item.id); // Redirige a detalle si tiene variantes
                      } else if (item.quantity > 0) {
                        addToCartAlert(item); // Añade directo si no tiene variantes
                      }
                    }}
                    disabled={!item.variants && item.quantity === 0}
                  >
                    {item.variants ? "Ver producto" : "Añadir al carrito"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 w-12 rounded-full shadow-lg hover:bg-purple-500 transition-all z-50"
          aria-label="Volver arriba"
        >
          <img src={arrowUp} alt="Flecha arriba" />
        </button>
      )}
    </div>
  );
};
