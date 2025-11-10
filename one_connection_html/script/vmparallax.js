// === Parallax lateral con profundidad 3D para .vicontent y .micontent ===
document.addEventListener("DOMContentLoaded", () => {
  const vi = document.querySelector(".vicontent");
  const mi = document.querySelector(".micontent");

  if (!vi || !mi) return;

  const triggerPoint = 550; // punto del scroll donde empieza el efecto
  const maxOffset = 50;     // desplazamiento máximo lateral
  const maxRotate = 20;     // rotación máxima (grados)
  let parallaxActive = false;

  function enableParallax() {
    if (parallaxActive) return;
    parallaxActive = true;

    window.addEventListener("scroll", handleScroll);
  }

  function disableParallax() {
    if (!parallaxActive) return;
    parallaxActive = false;

    window.removeEventListener("scroll", handleScroll);
    vi.style.transform = "translateX(0px) rotateY(0deg)";
    mi.style.transform = "translateX(0px) rotateY(0deg)";
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY < triggerPoint) {
      vi.style.transform = "translateX(0px) rotateY(0deg)";
      mi.style.transform = "translateX(0px) rotateY(0deg)";
      return;
    }

    const progress = Math.min((scrollY - triggerPoint) / 400, 1);
    const offset = maxOffset * progress;
    const rotate = maxRotate * progress;

    vi.style.transform = `translateX(${offset}px) rotateY(${rotate}deg)`;
    mi.style.transform = `translateX(${-offset}px) rotateY(${-rotate}deg)`;
  }

  // === Activar/desactivar según tamaño de pantalla ===
  function checkViewport() {
    if (window.innerWidth > 768) enableParallax();
    else disableParallax();
  }

  // Verificar al cargar y al redimensionar
  checkViewport();
  window.addEventListener("resize", checkViewport);
});
