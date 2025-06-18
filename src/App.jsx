import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Inicio } from "./components/inicio";
import { ProductList } from "./components/productList";
import { CartProvider } from "./components/style/context/cartContext";
import { Cart } from "./components/cart";
import { ProductDetails } from "./components/productDetails";
import { Resultados } from "./components/resultPage";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import QuienesSomos from "./components/quienesSomos";

function App() {
  const [products, setProduct] = useState([]);
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
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/resultados"
            element={<Resultados products={products} />}
          />
          <Route path="/quienesSomos" element={<QuienesSomos />} />

          {/* Ruta dinámica */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
