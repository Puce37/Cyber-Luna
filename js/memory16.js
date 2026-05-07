const images = [
  './rio/1.png',
  './rio/2.png',
  './rio/3.png',
  './rio/4.png',
  './rio/5.png',
  './rio/6.png',
  './rio/7.png',
  './rio/8.png'
];

let flippedCards = [];
let matchedCount = 0;
let cards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  matchedCount = 0;
  flippedCards = [];

  const doubledImages = shuffle([...images, ...images]);

  cards = doubledImages.map((imgSrc, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgSrc;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const img = document.createElement('img');
    img.src = imgSrc;
    cardFront.appendChild(img);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);

    card.addEventListener('click', () => flipCard(card));

    card.style.animationDelay = `${index * 50}ms`; // petit décalage entre chaque carte
    board.appendChild(card);
    return card;
  });

  document.getElementById('message').innerText = '';
}

function flipCard(card) {
  if (
    card.classList.contains('flipped') ||
    flippedCards.length === 2
  )
    return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    const img1 = card1.dataset.image;
    const img2 = card2.dataset.image;

    if (img1 === img2) {
      matchedCount++;
      flippedCards = [];
      if (matchedCount === images.length) {
        document.getElementById('message').innerText =
          '🎉 Bien joué ! + 10 points !';
        addPoints(10);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

function restartGame() {
  const board = document.getElementById('game-board');
  const allCards = board.querySelectorAll('.card');

  // Étape 1 : retourner toutes les cartes
  allCards.forEach(card => {
    card.classList.add('flipped');
  });

  // Étape 2 : attendre un peu, puis tout refermer
  setTimeout(() => {
    allCards.forEach(card => {
      card.classList.remove('flipped');
    });

    // Étape 3 : attendre que l’animation soit finie avant de recréer
    setTimeout(() => {
      createBoard(); // recrée avec nouveau mélange
    }, 600); // temps de l'animation CSS (0.6s)
  }, 1500); // laisse le temps de voir les cartes
}

function goToMenu() {
  window.location.href = 'choix_version.html';
}

window.onload = createBoard;