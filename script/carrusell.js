// seg_carousel.js — versión con fondo dinámico sincronizado
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".seg_content");
  const seguros = document.querySelector(".seguros"); // 🎯 contenedor principal
  if (!container || !seguros) return;

  const wrapper = container.querySelector(".carousel-wrapper");
  const track = container.querySelector(".carousel-track");
  let slides = Array.from(track.querySelectorAll('div[class^="seg"]'));
  const btnPrev = container.querySelector(".scroll-btn.left");
  const btnNext = container.querySelector(".scroll-btn.right");

  if (!track || slides.length === 0) return;

  const GAP = 0;
  let index = 0;
  let isTransitioning = false;

  // 🔁 Clonamos para bucle infinito
  const firstClones = slides.slice(0, 2).map(s => s.cloneNode(true));
  const lastClones = slides.slice(-2).map(s => s.cloneNode(true));

  lastClones.forEach(c => track.prepend(c));
  firstClones.forEach(c => track.appendChild(c));

  slides = Array.from(track.querySelectorAll('div[class^="seg"]'));
  index = 2;
  const realCount = slides.length - 4;

  function goTo(targetIndex, smooth = true) {
    if (isTransitioning) return;
    isTransitioning = true;

    const slideWidth = slides[0].offsetWidth + GAP;
    const wrapperWidth = wrapper.offsetWidth;
    const translate =
      wrapperWidth / 2 - slideWidth / 2 - targetIndex * slideWidth +
      slideWidth * 2; // compensar clones

    track.style.transition = smooth
      ? "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";

    track.style.transform = `translateX(${translate}px)`;

    // limpiar clases de estado
    slides.forEach(
      slide =>
        (slide.className = slide.className.replace(
          /\b(active|prev2|prev|next|next2)\b/g,
          ""
        ).trim())
    );

    slides[targetIndex].classList.add("active");
    if (slides[targetIndex - 1]) slides[targetIndex - 1].classList.add("prev");
    if (slides[targetIndex + 1]) slides[targetIndex + 1].classList.add("next");
    if (slides[targetIndex - 2]) slides[targetIndex - 2].classList.add("prev2");
    if (slides[targetIndex + 2]) slides[targetIndex + 2].classList.add("next2");

    // 🎨 FONDO DINÁMICO (transición suave)
    updateBackground(slides[targetIndex]);

    track.addEventListener("transitionend", handleLoop, { once: true });
  }

  function handleLoop() {
    const total = slides.length;
    if (index <= 1) {
      index = realCount + index;
      goTo(index, false);
    } else if (index >= total - 2) {
      index = index - realCount;
      goTo(index, false);
    }
    isTransitioning = false;
  }

  // 🟢 FONDO dinámico basado en la imagen de la tarjeta activa
  function updateBackground(activeSlide) {
    // Buscar imagen de fondo dentro del slide activo
    const picDiv = activeSlide.querySelector('[class^="pic"]');
    if (!picDiv) return;

    const style = getComputedStyle(picDiv);
    const bgImage = style.backgroundImage;

    // Aplica transición y cambio de fondo
    seguros.style.transition = "background-image 0.8s ease-in-out";
    seguros.style.backgroundImage = bgImage;
    seguros.style.backgroundPosition = "center center";
    seguros.style.backgroundSize = "cover";
    seguros.style.backgroundRepeat = "no-repeat";

    // Oscurecer ligeramente para mantener legibilidad
    seguros.style.backgroundColor = "rgba(0,0,0,0.6)";
    seguros.style.backgroundBlendMode = "overlay";
  }

  // Botones
  btnPrev?.addEventListener("click", () => {
    if (!isTransitioning) {
      index--;
      goTo(index);
    }
  });
  btnNext?.addEventListener("click", () => {
    if (!isTransitioning) {
      index++;
      goTo(index);
    }
  });

  // Gestos táctiles
  let startX = 0;
  wrapper.addEventListener(
    "touchstart",
    e => (startX = e.touches[0].clientX),
    { passive: true }
  );
  wrapper.addEventListener(
    "touchend",
    e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 40) {
        index++;
        goTo(index);
      } else if (diff < -40) {
        index--;
        goTo(index);
      }
    },
    { passive: true }
  );

  // Teclado y resize
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
      index++;
      goTo(index);
    }
    if (e.key === "ArrowLeft") {
      index--;
      goTo(index);
    }
  });
  window.addEventListener("resize", () => goTo(index, false));

  // Inicio centrado y con fondo sincronizado
  setTimeout(() => {
    goTo(index, false);
    updateBackground(slides[index]);
  }, 100);
});
