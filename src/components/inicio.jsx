import { useState } from "react";
import Carrousel from "./carrousel";
import { Nav } from "./nav";
import todos from "../assets/todos.png";
import iconRamen from "../assets/fideos.png";
import iconSnack from "../assets/cookies.png";
import iconRefresco from "../assets/refresco.png";
import iconDulces from "../assets/dulce.png";
import { ProductList } from "./productList";
import { Footer } from "./footer";

export const Inicio = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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
    <div className="bg-gray-200 h-full">
      <header>
        <Nav />
        <Carrousel />
      </header>
      <body>
        <div className="flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className="text-2xl font-bold mb-8">Productos</h1>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-x-20">
            <Button
              img
              src={todos}
              alt="todos"
              text="Todos"
              onClick={() => setSelectedCategory("Todos")}
            />
            <Button
              img
              src={iconRamen}
              alt="ramen"
              text="Ramen"
              onClick={() => setSelectedCategory("ramen")}
            />
            <Button
              img
              src={iconSnack}
              alt="snacks"
              text="Snacks"
              onClick={() => setSelectedCategory("snacks")}
            />
            <Button
              img
              src={iconRefresco}
              alt="refrescos"
              text="Refrescos"
              onClick={() => setSelectedCategory("refrescos")}
            />
            <Button
              img
              src={iconDulces}
              alt="dulces"
              text="Dulces"
              onClick={() => setSelectedCategory("dulces")}
            />
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
