/**
 * Colocar aquí JS "propio".
 * Notar que este código se ejecutará en el navegador.
 */

const modal = document.getElementById("myModal");

const btnSmall = document.getElementById("sidebarIconTweet");
const btn = document.getElementById("sidebarTweet");
const closeButton = document.getElementById("closeButton");

btnSmall.addEventListener("click", function (event) {
  event.preventDefault();
  modal.style.display = "block";
});

btn.addEventListener("click", function (event) {
  event.preventDefault();
  modal.style.display = "block";
});

window.addEventListener("click", function (event) {
  if (event.target === modal || event.target === closeButton) {
    modal.style.display = "none";
  }
});
