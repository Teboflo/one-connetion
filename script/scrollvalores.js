// === Scroll horizontal controlado con efecto de enfoque ===
document.addEventListener("DOMContentLoaded", () => {
  const original = document.querySelector(".valcontent");
  if (!original) return;

  // Crear contenedor desplazable y mover los hijos dentro
  const scrollable = document.createElement("div");
  scrollable.classList.add("valcontent-scrollable");

  while (original.firstChild) {
    scrollable.appendChild(original.firstChild);
  }
  original.appendChild(scrollable);

  // Crear botones
  const leftBtn = document.createElement("button");
  const rightBtn = document.createElement("button");

  leftBtn.className = "scroll-btn left";
  rightBtn.className = "scroll-btn right";
  leftBtn.innerHTML = "<i class='bx bx-chevron-left'></i>";
  rightBtn.innerHTML = "<i class='bx bx-chevron-right'></i>";

  original.appendChild(leftBtn);
  original.appendChild(rightBtn);

  const slides = scrollable.querySelectorAll("div");
  let currentIndex = 0;

  // Función para centrar el valor y aplicar efecto activo
  function scrollToIndex(index) {
    const target = slides[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    updateActive(index);
  }

  // Actualiza el foco visual (enfoque/desenfoque)
  function updateActive(activeIndex) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === activeIndex);
    });
  }

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) currentIndex--;
    scrollToIndex(currentIndex);
  });

  rightBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) currentIndex++;
    scrollToIndex(currentIndex);
  });

  // Detectar scroll manual para ajustar enfoque dinámico
  scrollable.addEventListener("scroll", () => {
    const center = scrollable.scrollLeft + scrollable.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    slides.forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(window.innerWidth / 2 - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });
    currentIndex = closestIndex;
    updateActive(currentIndex);
  });

  // Enfocar el primer valor al cargar
  updateActive(0);
});
