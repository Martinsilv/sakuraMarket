export const ScrollToProducts = () => {
  const handleScroll = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <span
      onClick={handleScroll}
      className="cursor-pointer hover:scale-110 transition-transform duration-150"
    >
      Productos
    </span>
  );
};
