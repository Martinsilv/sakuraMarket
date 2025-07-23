import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation2 from "../assets/loader2.json";
export const Search = ({ products, closeMenu }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchText.trim() === "") {
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Simula un "delay" para que se vea el loader

    return () => clearTimeout(timeout);
  }, [searchText]);

  // Filtrar productos con validación
  const filteredProducts = products.filter((product) => {
    // Verificar si product y product.name existen
    if (!product || typeof product.name !== "string") {
      return false;
    }

    try {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    } catch {
      console.error("Error al filtrar producto:", product);
      return false;
    }
  });

  // Función para redirigir al detalle del producto
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navegar a ProductDetails con el id del producto
  };

  return (
    <div className="relative w-80 pt-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchText.trim() !== "") {
            navigate(`/resultados?search=${encodeURIComponent(searchText)}`);
            setSearchText(""); // limpiar el input si querés
            if (closeMenu) closeMenu();
          }
        }}
      >
        <input
          type="text"
          className="w-full font-fredoka border-4 border-primary-pink focus:border-primary-dark bg-white text-black rounded-lg p-2 transition-colors duration-200 outline-none"
          placeholder="Buscar producto..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-7 text-white bg-primary-dark px-3 py-1 rounded-md hover:bg-primary-violet font-fredoka font-normal"
        >
          Buscar
        </button>
      </form>

      {/* Resultados filtrados (solo si hay texto en el input) */}
      {searchText && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto z-10">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Lottie animationData={loaderAnimation2} className="w-20 h-20" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(item.id)}
                >
                  <img
                    src={item?.image || ""}
                    alt={item?.name || "Producto"}
                    className="w-10 h-10 object-cover rounded-md"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                      e.target.alt = "Imagen no disponible";
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {item?.name || "Producto sin nombre"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-sm text-gray-500">
              No se encontraron productos
            </div>
          )}
        </div>
      )}
    </div>
  );
};
