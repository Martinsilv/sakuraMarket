import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav } from "./nav";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import loaderAnimation from "../assets/Animation-11.json";
import { useCart } from "./style/context/cartContext";
import { Footer } from "./footer";

export const Resultados = ({ products }) => {
  const location = useLocation();
  const [filtered, setFiltered] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  // Obtener el texto de búsqueda desde la URL
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search") || "";
  useEffect(() => {
    if (products.length === 0) return; // Espera hasta que haya productos

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFiltered(results);
    setLoading(false);
  }, [searchText, products]);

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

  const navigate = useNavigate();
  const handleCard = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Mostrar un mensaje de carga mientras se obtienen los productos
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          className="w-32 h-32 top-0"
        />
        <p className="text-lg font-medium text-gray-500">
          Cargando producto...
        </p>
      </div>
    );
  }
  return (
    <>
      <div>
        <Nav />
      </div>
      <span>
        {" "}
        <h2 className="text-xl font-bold mb-4">
          Resultados de búsqueda: "{searchText}"
        </h2>
      </span>
      <section id="products-section">
        <div className="m-4 sm:m-6 md:m-8 lg:m-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="flex justify-center">
              <div
                onClick={() => handleCard(item.id)}
                className="transform transition duration-300 hover:scale-105 rounded-lg shadow-lg h-fit w-full max-w-64 hover:shadow-xl bg-white"
              >
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
      <Footer />
    </>
  );
};
