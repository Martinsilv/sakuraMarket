import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useCart } from "./style/context/cartContext";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/Animation-11.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "sakura-products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const isSimpleVariant =
    product?.variants && typeof Object.values(product.variants)[0] === "number";

  const isOutOfStock = () => {
    if (product.variants) {
      if (isSimpleVariant) {
        return !Object.values(product.variants).some((qty) => qty > 0);
      } else {
        return !Object.values(product.variants).some((colorsObj) =>
          Object.values(colorsObj).some((qty) => qty > 0)
        );
      }
    } else {
      return product.quantity === 0;
    }
  };

  const addToCartAlert = async () => {
    if (product.variants) {
      if (isSimpleVariant) {
        if (!selectedVariant) {
          Swal.fire("Seleccioná una opción antes de añadir al carrito");
          return;
        }
        const variantQty = product.variants[selectedVariant] ?? 0;
        if (variantQty <= 0) {
          Swal.fire("Sin stock", "No hay más unidades disponibles.", "warning");
          return;
        }

        Swal.fire({
          title: "¿Añadir al carrito?",
          text: `Producto: ${product.name} - Opción: ${selectedVariant}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const updatedQty = variantQty - 1;

            const itemToAdd = {
              ...product,
              selectedVariant,
            };
            await addToCart(itemToAdd);

            const productRef = doc(db, "sakura-products", product.id);
            await updateDoc(productRef, {
              [`variants.${selectedVariant}`]: updatedQty,
            });

            setProduct((prev) => ({
              ...prev,
              variants: {
                ...prev.variants,
                [selectedVariant]: updatedQty,
              },
            }));

            Swal.fire("Añadido", "Producto añadido al carrito", "success");
          }
        });
      } else {
        if (!selectedSize || !selectedColor) {
          Swal.fire("Seleccioná talle y color");
          return;
        }
        const variantQty =
          product.variants?.[selectedSize]?.[selectedColor] ?? 0;
        if (variantQty <= 0) {
          Swal.fire("Sin stock", "No hay unidades disponibles", "warning");
          return;
        }

        Swal.fire({
          title: "¿Añadir al carrito?",
          text: `Producto: ${product.name} - Talle: ${selectedSize} - Color: ${selectedColor}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const updatedQty = variantQty - 1;

            const itemToAdd = {
              ...product,
              selectedSize,
              selectedColor,
            };
            await addToCart(itemToAdd);

            const productRef = doc(db, "sakura-products", product.id);
            await updateDoc(productRef, {
              [`variants.${selectedSize}.${selectedColor}`]: updatedQty,
            });

            setProduct((prev) => {
              const updated = { ...prev };
              updated.variants[selectedSize][selectedColor] = updatedQty;
              return updated;
            });

            Swal.fire("Añadido", "Producto añadido al carrito", "success");
          }
        });
      }
    } else {
      // Producto sin variantes
      if (product.quantity <= 0) {
        Swal.fire("Sin stock", "Producto no disponible", "warning");
        return;
      }

      Swal.fire({
        title: "¿Añadir al carrito?",
        text: `Producto: ${product.name}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const itemToAdd = { ...product };
          await addToCart(itemToAdd);

          const productRef = doc(db, "sakura-products", product.id);
          await updateDoc(productRef, {
            quantity: product.quantity - 1,
          });

          setProduct((prev) => ({
            ...prev,
            quantity: prev.quantity - 1,
          }));

          Swal.fire("Añadido", "Producto añadido al carrito", "success");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Lottie
          animationData={loaderAnimation}
          loop
          autoplay
          className="w-40 h-40"
        />
        <p className="text-lg font-medium font-fredoka text-gray-500">
          Cargando producto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium font-fredoka text-red-500">
          Producto no encontrado.
        </p>
      </div>
    );
  }

  const sizeOptions = product.variants ? Object.keys(product.variants) : [];
  const colorOptions =
    selectedSize && product.variants[selectedSize]
      ? Object.entries(product.variants[selectedSize])
      : [];

  const simpleOptions = product.variants
    ? Object.entries(product.variants)
    : [];

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full overflow-hidden flex flex-col md:flex-row">
          <div className="relative md:w-1/2">
            {product.images && product.images.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
                className="rounded-lg"
              >
                {product.images.map((imgUrl, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={imgUrl}
                      alt={`${product.name} ${index + 1}`}
                      className="object-cover w-full h-80 md:h-[500px] rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover md:h-full rounded-lg"
              />
            )}

            {isOutOfStock() && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  Sin stock
                </span>
              </div>
            )}
          </div>

          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4 font-fredoka">
              {product.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 font-fredoka">
              {product.description || "Sin descripción disponible."}
            </p>

            {product.variants && (
              <>
                {isSimpleVariant ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Opción:
                    </label>
                    <select
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 font-fredoka"
                    >
                      <option value="">Seleccioná una opción</option>
                      {simpleOptions.map(([option, qty]) => (
                        <option key={option} value={option} disabled={qty <= 0}>
                          {option} {qty <= 0 ? "(Sin stock)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1 font-fredoka">
                        Talle:
                      </label>
                      <select
                        value={selectedSize}
                        onChange={(e) => {
                          setSelectedSize(e.target.value);
                          setSelectedColor("");
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="">Seleccioná un talle</option>
                        {sizeOptions.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedSize && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Color:
                        </label>
                        <select
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                          <option value="">Colores disponibles</option>
                          {colorOptions.map(([color, qty]) => (
                            <option
                              key={color}
                              value={color}
                              disabled={qty <= 0}
                            >
                              {color} {qty <= 0 ? "(Sin stock)" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="text-xl md:text-2xl font-bold text-green-600 mb-4 md:mb-0">
                {product.salePrice ? (
                  <div className="flex items-center gap-2">
                    <p className="text-lg text-gray-500 line-through">
                      ${product.price}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      ${product.salePrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-bold">${product.price}</p>
                )}
              </span>

              <button
                className={`w-full md:w-auto px-6 py-3 text-white text-sm md:text-base font-medium rounded-md transition-all duration-200 ${
                  isOutOfStock()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-violet hover:bg-purple-600 cursor-pointer"
                }`}
                type="button"
                onClick={addToCartAlert}
                disabled={isOutOfStock()}
              >
                {isOutOfStock() ? "No disponible" : "Añadir al carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
