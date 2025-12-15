document.addEventListener("click", function (e) {

  // BOTÓN SABER MÁS
  const btn = e.target.closest(".back-seguros a");
  if (btn) {
    e.preventDefault();

    const card = btn.closest(".back-seguros");
    const modal = document.getElementById("modalSeguros");

    document.getElementById("modalTitle").textContent =
      card.querySelector(".seguros-title").textContent;


    const bg = card.style.backgroundImage;
    if (bg) {
      document.getElementById("modalImage").src =
        bg.replace(/url\(["']?(.*?)["']?\)/, "$1");
    }

    modal.classList.add("active");
    return;
  }

  // CIERRE DEL MODAL
  if (
    e.target.classList.contains("modal-overlay") ||
    e.target.classList.contains("modal-close")
  ) {
    document.getElementById("modalSeguros").classList.remove("active");
  }

});
