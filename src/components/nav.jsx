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
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa

  useEffect(() => {
    const products = collection(db, "sakura-products");

    // Listener para actualizaciones en tiempo real
    const unsubscribe = onSnapshot(products, (snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(updatedProducts);
    });

    // Limpieza del listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <nav className="flex flex-row bg-white justify-between border-b-4 border-y-primary items-center relative">
        {/* Logo */}
        <img
          src={miImagen}
          alt="logo"
          className="ml-5 flex justify-start w-16 h-16 rounded-full"
        />
        <h1 className="m-6 w-1/5 text-3xl text-primary-dark">Sakura Market</h1>

        {/* Search (ocultar en móviles) */}
        <div className="hidden md:block pb-5">
          <Search products={products} closeMenu={() => setMenuOpen(false)} />
        </div>

        {/* Menú Hamburguesa (visible en móviles) */}
        <div className="md:hidden m-6 z-20">
          <button
            className="text-primary-dark text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "X" : "☰"}
          </button>
        </div>

        {/* Menú principal (desktop) */}
        <ul className="hidden md:flex w-5/12 m-6 text-primary-dark text-xl flex-row justify-between items-center">
          <Link
            to={"/"}
            className="hover:scale-110 transition-transform duration-150"
          >
            Inicio
          </Link>
          <li className="hover:scale-110 transition-transform duration-150">
            <ScrollToProducts />
          </li>
          <li className="hover:scale-110 transition-transform duration-150">
            ¿Quienes somos?
          </li>
          <li className="hover:scale-105 transition-transform duration-150">
            <AddToCart />
          </li>
        </ul>

        {/* Menú desplegable (mobile) */}
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
            <li
              className="py-2 hover:scale-110 transition-transform duration-150"
              onClick={() => setMenuOpen(false)}
            >
              ¿Quienes somos?
            </li>
            <li
              className="py-2 hover:scale-105 transition-transform duration-150"
              onClick={() => setMenuOpen(false)}
            >
              <AddToCart />
            </li>
          </ul>
        </div>
      </nav>
      <div className="w-auto pb-4 flex justify-center items-center bg-white  lg:hidden">
        <Search products={products} closeMenu={() => setMenuOpen(false)} />
      </div>
    </div>
  );
};
