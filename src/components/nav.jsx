import { Link } from "react-router-dom";
import { AddToCart } from "./addToCart";
import { Search } from "./search";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ScrollToProducts } from "./scrollProducts";
import miImagen from "../assets/logosakura.jpeg";

export const Nav = () => {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scrollTarget = localStorage.getItem("scrollToSection");

    if (scrollTarget === "products") {
      const targetElement = document.getElementById("products-section");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      localStorage.removeItem("scrollToSection");
    }
  }, []);

  useEffect(() => {
    const products = collection(db, "sakura-products");
    const unsubscribe = onSnapshot(products, (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(updatedProducts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {/* ⬇️ Este nav ahora es fijo */}
      <nav className="flex flex-row bg-white justify-between border-b-4 border-y-primary items-center fixed top-0 left-0 right-0 z-50 shadow-md">
        <Link to={"/"} className="flex flex-row items-center w-full lg:w-1/4">
          <img
            src={miImagen}
            alt="logo"
            className="ml-5 w-16 h-16 rounded-full"
          />
          <h1 className="mx-6 text-3xl text-center text-primary-dark">
            Sakura Market
          </h1>
        </Link>

        {/* Search (oculto en móviles) */}
        <div className="hidden lg:block pb-5">
          <Search products={products} closeMenu={() => setMenuOpen(false)} />
        </div>

        <div className="lg:hidden">
          <AddToCart />
        </div>

        {/* Botón hamburguesa */}
        <div className="lg:hidden m-6 z-20">
          <button
            className="text-primary-dark text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "X" : "☰"}
          </button>
        </div>

        {/* Menú desktop */}
        <ul className="hidden lg:flex w-5/12 m-6 text-primary-dark text-xl flex-row justify-between items-center">
          <Link
            to={"/"}
            className="hover:scale-110 transition-transform duration-150"
          >
            Inicio
          </Link>
          <li className="hover:scale-110 transition-transform duration-150">
            <ScrollToProducts />
          </li>
          <Link
            to={"/quienesSomos"}
            className="hover:scale-110 transition-transform duration-150"
          >
            ¿Quienes somos?
          </Link>
          <li className="hover:scale-105 transition-transform duration-150">
            <AddToCart />
          </li>
        </ul>

        {/* Menú desplegable mobile */}
        <div
          className={`absolute left-0 w-full bg-white shadow-lg z-10 transition-all duration-300 transform ${
            menuOpen
              ? "top-full opacity-100"
              : "top-0 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="text-primary-dark text-lg flex flex-col items-center py-4">
            <Link
              to={"/"}
              className="py-2 hover:scale-110 transition-transform duration-150"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
            <li
              className="py-2 hover:scale-110 transition-transform duration-150"
              onClick={() => setMenuOpen(false)}
            >
              <ScrollToProducts />
            </li>
            <Link
              to={"/quienesSomos"}
              className="py-2 hover:scale-110 transition-transform duration-150"
              onClick={() => setMenuOpen(false)}
            >
              ¿Quienes somos?
            </Link>
          </ul>
        </div>
      </nav>

      {/* ⬇️ Este Search se mantiene debajo del nav (solo en mobile) */}
      <div className="w-auto pb-4 flex justify-center items-center bg-gray-50 lg:hidden mt-24">
        {/* 👈 Agregamos mt-24 para dejar espacio debajo del nav fijo */}
        <Search products={products} closeMenu={() => setMenuOpen(false)} />
      </div>
    </div>
  );
};
