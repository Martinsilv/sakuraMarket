import { useNavigate, useLocation } from "react-router-dom";

export const ScrollToProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    if (location.pathname === "/") {
      // Ya estás en el home, scrollea directo
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Estás en otra ruta, dejá una marca y volvé al home
      localStorage.setItem("scrollToSection", "products");
      navigate("/");
    }
  };

  return (
    <span
      onClick={handleScroll}
      className=" cursor-pointer hover:scale-110 transition-transform duration-150"
    >
      Productos
    </span>
  );
};
