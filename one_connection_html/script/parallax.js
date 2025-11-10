// === Parallax para .content y sus hijos ===
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const content = header?.querySelector(".content");
  if (!header || !content) return;

  content.classList.add("parallax-active");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Movimiento del contenedor padre (más leve)
    const parentDepth = scrollY * 0.12;

    // Movimiento de capas internas
    const depth1 = scrollY * 0.02; // .sliders
    const depth2 = scrollY * 0.03; // .pcontent

    // Aplicar variables CSS dinámicamente
    content.style.setProperty("--parallax-parent", `${parentDepth}px`);
    content.style.setProperty("--parallax-depth1", `${depth1}px`);
    content.style.setProperty("--parallax-depth2", `${depth2}px`);
  });
});

