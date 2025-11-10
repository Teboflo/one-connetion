document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.querySelector(".ctabuttom2");
  const procesosBtn = document.querySelector(".ctabuttom1");

  const adminInfo = document.getElementById("extra-admin");
  const procesosInfo = document.getElementById("extra-procesos");

  const closeBtns = document.querySelectorAll(".close-extra");

  // abrir
  adminBtn.addEventListener("click", e => {
    e.preventDefault();
    adminInfo.classList.add("active");
  });

  procesosBtn.addEventListener("click", e => {
    e.preventDefault();
    procesosInfo.classList.add("active");
  });

  // cerrar
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".extra-info").classList.remove("active");
    });
  });

  // cerrar con clic fuera
  document.querySelectorAll(".extra-info").forEach(layer => {
    layer.addEventListener("click", e => {
      if (e.target === layer) layer.classList.remove("active");
    });
  });
});
