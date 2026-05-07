let clicks = parseInt(localStorage.getItem("clicks")) || 0;
let multiplier = parseInt(localStorage.getItem("clickMultiplier")) || 1;

function updateClicksDisplay() {
  document.getElementById("clicksDisplay").textContent = `Clicks : ${clicks} (x${multiplier})`;
}

function exchange(clickCost, pointGain) {
  if (clicks >= clickCost) {
    clicks -= clickCost;
    localStorage.setItem("clicks", clicks);
    addPoints(pointGain);
    updateClicksDisplay();
  } else {
    alert("Tu n'as pas assez de clicks !");
  }
}

function buyImage(path, cost) {
  if (clicks >= cost) {
    clicks -= cost;
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("selectedClickerImage", path);
    alert("Image achetée et équipée !");
    updateClicksDisplay();
  } else {
    alert("Pas assez de clicks !");
  }
}

function buyMultiplier(mult, cost) {
  if (clicks >= cost) {
    clicks -= cost;
    multiplier += mult;
    localStorage.setItem("clicks", clicks);
    localStorage.setItem("clickMultiplier", multiplier);
    alert(`Multiplicateur x${mult} activé !`);
    updateClicksDisplay();
  } else {
    alert("Pas assez de clicks !");
  }
}

window.addEventListener("load", updateClicksDisplay);