const musicToggle = document.getElementById("music-toggle");
const bgMusic = document.getElementById("bg-music");

if (musicToggle) {
  const musicEnabled = localStorage.getItem("music") === "on";
  musicToggle.checked = musicEnabled;
  if (musicEnabled) {
    bgMusic.volume = 0.3;
    bgMusic.play();
  }

  musicToggle.addEventListener("change", () => {
    if (musicToggle.checked) {
      localStorage.setItem("music", "on");
      bgMusic.volume = 0.3;
      bgMusic.play();
    } else {
      localStorage.setItem("music", "off");
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  });
}

function testMusic() {
  bgMusic.currentTime = 0;
  bgMusic.play();
}

function goToMenu() {
  window.location.href = "index.html";
}

function resetPoints() {
  const confirmReset = confirm(
    "⚠️ ATTENTION : Cela va remettre vos points, bonus et inventaire à zéro. Voulez-vous continuer ?",
  );
  if (confirmReset) {
    localStorage.setItem("points", "0");
    localStorage.setItem("multipliers", "[]");
    localStorage.setItem("inventory", "[]");
    localStorage.setItem("equipped", "[]");
    alert("✅ Tous les paramètres ont été réinitialisés !");
    window.location.reload();
  }
}