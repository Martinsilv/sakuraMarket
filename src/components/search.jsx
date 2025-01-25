import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const Search = ({ products }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate

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
      {/* Input del buscador */}
      <input
        type="text"
        className="w-full border-4 border-primary-pink focus:border-primary-dark bg-white text-black rounded-lg p-2 transition-colors duration-200 outline-none"
        placeholder="Buscar producto..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Resultados filtrados (solo si hay texto en el input) */}
      {searchText && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto z-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProductClick(item.id)} // Llamar a handleProductClick al hacer clic
              >
                <img
                  src={item?.image || ""}
                  alt={item?.name || "Producto"}
                  className="w-10 h-10 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg"; // Reemplaza con tu imagen por defecto
                    e.target.alt = "Imagen no disponible";
                  }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {item?.name || "Producto sin nombre"}
                </span>
              </li>
            ))
          ) : (
            <li className="p-2 text-sm text-gray-500">
              No se encontraron productos
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
