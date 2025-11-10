// === Popup para One Connection ===
document.addEventListener("DOMContentLoaded", () => {
  const btnSaberMas = document.querySelector(".cta-header");
  const popupOneConnection = document.getElementById("popup-oneconnection");
  const closeBtn = popupOneConnection?.querySelector(".close-popup-oneconnection");

  if (!btnSaberMas || !popupOneConnection) return;

  // abrir popup
  btnSaberMas.addEventListener("click", e => {
    e.preventDefault();
    popupOneConnection.classList.add("active");
  });

  // cerrar con botón
  closeBtn?.addEventListener("click", () => {
    popupOneConnection.classList.remove("active");
  });

  // cerrar si se hace clic fuera del contenido
  popupOneConnection.addEventListener("click", e => {
    if (e.target === popupOneConnection) {
      popupOneConnection.classList.remove("active");
    }
  });
});
