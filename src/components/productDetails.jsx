import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useCart } from "./style/context/cartContext";
import { Footer } from "./footer";
import { Nav } from "./nav";

export const ProductDetails = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState(null); // Estado para el producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "sakura-products", id); // Referencia al documento
        const productSnap = await getDoc(productRef); // Obtener el documento

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() }); // Guardar datos
        } else {
          console.error("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false); // Finalizar carga
      }
    };

    fetchProduct();
  }, [id]); // Ejecutar cuando cambie el ID
  const { addToCart } = useCart();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-500 animate-pulse">
          Cargando producto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-red-500">
          Producto no encontrado.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full overflow-hidden flex flex-col md:flex-row">
          {/* Imagen del producto */}
          <div className="relative md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover md:h-full"
            />
            {product.quantity === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  Sin stock
                </span>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            {/* Nombre del producto */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            {/* Descripción */}
            <p className="text-base md:text-lg text-gray-600 mb-6">
              {product.description || "Sin descripción disponible."}
            </p>

            {/* Precio y botón */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="text-xl md:text-2xl font-bold text-green-600 mb-4 md:mb-0">
                ${product.price}
              </span>

              <button
                className={`w-full md:w-auto px-6 py-3 text-white text-sm md:text-base font-medium rounded-md transition-all duration-200 ${
                  product.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-violet hover:bg-purple-600 cursor-pointer"
                }`}
                type="button"
                onClick={() => {
                  if (product.quantity > 0) {
                    addToCartAlert(product); // Solo permite si hay stock
                  } else {
                    Swal.fire({
                      title: "Sin stock",
                      text: "Lo sentimos, este producto no está disponible actualmente.",
                      icon: "warning",
                      confirmButtonText: "Entendido",
                    });
                  }
                }}
                disabled={product.quantity === 0}
              >
                {product.quantity === 0 ? "No disponible" : "Añadir al carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
