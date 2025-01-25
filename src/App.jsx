import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Inicio } from "./components/inicio";
import { ProductList } from "./components/productList";
import { CartProvider } from "./components/style/context/cartContext";
import { Cart } from "./components/cart";
import { ProductDetails } from "./components/productDetails";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />{" "}
          {/* Ruta dinámica */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
