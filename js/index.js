function startGame() {
  window.location.href = "./jeu/choix_jeu.html";
}

function inv() {
  window.location.href = "./shop/inventory.html";
}

function shop() {
  window.location.href = "./shop/magasin.html";
}

function openOptions() {
  window.location.href = "./Option.html";
}

function showAbout() {
  window.location.href = "./apropos.html";
}

window.addEventListener("load", () => {
  if (!sessionStorage.getItem("messageShown")) {
    const message = document.getElementById("fullscreen-warning");
    sessionStorage.setItem("messageShown", "true");

    setTimeout(() => {
      // Faire disparaître le message en douceur
      message.style.opacity = "0";
      setTimeout(() => {
        message.style.display = "none";
      }, 1000); // correspond à la durée de transition CSS (1s)
    }, 2000); // affiche 2 secondes
  } else {
    // Ne pas afficher si déjà montré dans cet onglet
    const message = document.getElementById("fullscreen-warning");
    if (message) {
      message.style.display = "none";
    }
  }
});