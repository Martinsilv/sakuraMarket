import { useState } from "react";
import Carrousel from "./carrousel";
import { Nav } from "./nav";
import todos from "../assets/todos.png";
import iconRamen from "../assets/fideos.png";
import iconSnack from "../assets/cookies.png";
import iconRefresco from "../assets/refresco.png";
import iconDulces from "../assets/dulce.png";
import iconBazar from "../assets/bazar.png";
import iconIndumentaria from "../assets/percha.png";
import iconPeluches from "../assets/oso-de-peluche.png";
import iconLibreria from "../assets/libro.png";
import iconDeco from "../assets/lampara.png";
import iconPlus from "../assets/plus.png";
import iconbox from "../assets/suscripcion.png";
import iconSkinCare from "../assets/brillo.png";
import { ProductList } from "./productList";
import { Footer } from "./footer";
import { motion, AnimatePresence } from "framer-motion";

export const Inicio = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCategories, setShowCategories] = useState(false);

  const handleScroll = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const carouselLinks = [
    null, // Primera imagen sin enlace
    "/product/AfoPXvjoz9DjGnif9AcI", // Segunda imagen(fanta)
    "/product/PxaYYGDHtgcKic2JhKyt", // Tercera imagen(crybaby)
    "/product/ipjFBbpBvh51GcsNj15c", // Cuarta imagen(smiski)
    "/resultados?search=ramune", // Quinta imagen(ramune)
    "/product/hGgRlIbXRXRK1gQfqW7R", // Sexta imagen(pokemon-grisines)
    "/product/GuF3w1MZCyxgKlupPYzl", // Séptima imagen(kuromi-cajasorpresa)
    "/resultados?search=sailor", // Octava imagen(sailor-moon)
    "/resultados?search=one%20piece", // Novena imagen(one-piece)
    "/product/Ll6bmU8N6KGtHiRoJbT9", // Décima imagen(buldak-pote)
    "/resultados?search=buldak", // Undécima imagen(buldak palitos)
    "/product/2zyrceyi09mFxpF2yfss", // Duodécima imagen(monsters keen)
    "/product/Gd4svkB9d2v0DT61RNSu", // Decimotercera imagen(monsters dragon ice tea)
    // Agrega más enlaces según tus imágenes del carrusel
  ];

  const Button = ({ text, img, src, alt, onClick }) => (
    <div className="flex flex-col items-center justify-center">
      <button
        className="bg-primary-violet hover:bg-primary-violerHover transition duration-200 py-2 px-4 w-40 h-40 rounded-full flex items-center justify-center"
        onClick={onClick}
      >
        {img && <img src={src} alt={alt} className="w-20 h-20" />}
      </button>
      <span className="mt-2">{text}</span>
    </div>
  );

  return (
    <div className="bg-gray-50 h-full">
      <header className="lg:pt-20">
        <Nav />
        <Carrousel links={carouselLinks} />
      </header>
      <body id="products-section">
        <div className="flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className=" font-fredoka font-semibold text-3xl  mb-8 pt-16 ">
            Productos
          </h1>
          <div className="grid grid-cols-2  gap-6  ">
            {/* Botón "Todos" */}
            <Button
              img
              src={todos}
              alt="todos"
              text="Todos"
              onClick={() => {
                setSelectedCategory("Todos");
                handleScroll();
              }}
            />

            {/* Botón "Categorías" para desplegar */}
            <Button
              img
              src={iconPlus}
              text="Categorías"
              onClick={() => setShowCategories((prev) => !prev)}
            />

            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-2 lg:col-span-2 grid grid-cols-2 lg:grid-cols-5 gap-2  mt-4 overflow-hidden"
                >
                  <Button
                    img
                    src={iconRamen}
                    alt="ramen"
                    text="Ramen"
                    onClick={() => {
                      setSelectedCategory("ramen");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconSnack}
                    alt="snacks"
                    text="Snacks"
                    onClick={() => {
                      setSelectedCategory("snacks");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconRefresco}
                    alt="refrescos"
                    text="Refrescos"
                    onClick={() => {
                      setSelectedCategory("refrescos");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconDulces}
                    alt="dulces"
                    text="Dulces"
                    onClick={() => {
                      setSelectedCategory("dulces");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconbox}
                    alt="blind box"
                    text="Blind Box"
                    onClick={() => {
                      setSelectedCategory("box");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconBazar}
                    alt="bazar"
                    text="Bazar"
                    onClick={() => {
                      setSelectedCategory("bazar");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconIndumentaria}
                    alt="indumentaria"
                    text="Indumentaria"
                    onClick={() => {
                      setSelectedCategory("indumentaria");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconPeluches}
                    alt="peluches"
                    text="Peluches"
                    onClick={() => {
                      setSelectedCategory("peluches");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconLibreria}
                    alt="libreria"
                    text="Librería"
                    onClick={() => {
                      setSelectedCategory("libreria");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconDeco}
                    alt="decoracion"
                    text="Sakura Deco"
                    onClick={() => {
                      setSelectedCategory("deco");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                  <Button
                    img
                    src={iconSkinCare}
                    alt="cuidado de la piel"
                    text="Skin Care"
                    onClick={() => {
                      setSelectedCategory("skincare");
                      handleScroll();
                      setShowCategories(false);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <main className="flex flex-col">
          <ProductList selectedCategory={selectedCategory} />
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </div>
  );
};
