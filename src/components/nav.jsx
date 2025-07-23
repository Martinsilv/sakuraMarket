import { Link } from "react-router-dom";
import { AddToCart } from "./addToCart";
import { Search } from "./search";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { ScrollToProducts } from "./scrollProducts";
import miImagen from "../assets/logosakura.jpeg";
import { motion, AnimatePresence } from "framer-motion";

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

  // Variantes de animación para el menú
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Variantes para los elementos del menú
  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.1,
        ease: "easeOut",
      },
    },
  };

  // Variantes para el botón hamburguesa
  const buttonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <div>
      {/* ⬇️ Este nav ahora es fijo */}
      <nav className="flex flex-row bg-white justify-between border-b-4 border-y-primary items-center fixed top-0 left-0 right-0 z-50 shadow-md">
        <Link to={"/"} className="flex flex-row items-center w-full lg:w-1/4">
          <motion.img
            src={miImagen}
            alt="logo"
            className="ml-5 w-16 h-16 rounded-full"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          />
          <h1 className="font-fredoka font-medium mx-6 text-3xl text-center text-primary-dark">
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
          <motion.button
            className="text-primary-dark text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            variants={buttonVariants}
            animate={menuOpen ? "open" : "closed"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? "X" : "☰"}
          </motion.button>
        </div>

        {/* Menú desktop */}
        <ul className="hidden lg:flex w-5/12 m-6 text-primary-dark text-xl flex-row justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
          >
            <Link to={"/"}>Inicio</Link>
          </motion.div>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
          >
            <ScrollToProducts />
          </motion.li>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
          >
            <Link to={"/quienesSomos"}>¿Quienes somos?</Link>
          </motion.div>
          <motion.li
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <AddToCart />
          </motion.li>
        </ul>

        {/* Menú desplegable mobile con Framer Motion */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute left-0 w-full bg-white shadow-lg z-10 overflow-hidden top-full"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.ul className="font-fredoka font-normal text-primary-dark text-xl flex flex-col items-center py-4">
                <motion.div variants={itemVariants}>
                  <Link
                    to={"/"}
                    className="py-2 block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, color: "#e91e63" }}
                      transition={{ duration: 0.2 }}
                    >
                      Inicio
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.li variants={itemVariants} className="py-2">
                  <motion.div
                    whileHover={{ scale: 1.1, color: "#e91e63" }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ScrollToProducts />
                  </motion.div>
                </motion.li>

                <motion.div variants={itemVariants}>
                  <Link
                    to={"/quienesSomos"}
                    className="py-2 block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <motion.span
                      whileHover={{ scale: 1.1, color: "#e91e63" }}
                      transition={{ duration: 0.2 }}
                    >
                      ¿Quienes somos?
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ⬇️ Este Search se mantiene debajo del nav (solo en mobile) */}
      <div className="w-auto pb-4 flex justify-center items-center bg-gray-50 lg:hidden mt-24">
        {/* 👈 Agregamos mt-24 para dejar espacio debajo del nav fijo */}
        <Search products={products} closeMenu={() => setMenuOpen(false)} />
      </div>
    </div>
  );
};
