let clicks = parseInt(localStorage.getItem("clicks")) || 0;
let multiplier = parseInt(localStorage.getItem("clickMultiplier")) || 1;

function updateClicksDisplay() {
  document.getElementById("clicks").textContent = "Clicks : " + clicks;
}

function handleClick() {
  clicks += multiplier; // Utilise le multiplicateur ici
  localStorage.setItem("clicks", clicks);
  updateClicksDisplay();
}

function loadClickerImage() {
  const selectedImage = localStorage.getItem("selectedClickerImage") || "./img/click1.png";
  document.getElementById("clicker-img").src = selectedImage;
}

window.addEventListener("load", () => {
  updateClicksDisplay();
  loadClickerImage();
});