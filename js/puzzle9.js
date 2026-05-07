const puzzle = document.getElementById('puzzle');
const victory = document.getElementById('victory');
const title = document.getElementById('title');
const imageSelect = document.getElementById('image-select');
const N = 3;
const rewardPoints = 5;
let currentImage = imageSelect.value;

imageSelect.addEventListener('change', () => {
  currentImage = imageSelect.value;
  startGame();
});

function startGame() {
  puzzle.innerHTML = '';
  title.textContent = `${N * N} Pièces`;
  const positions = [];
  const pieceSize = 600 / N;

  puzzle.style.width = '600px';
  puzzle.style.height = '600px';

  for (let i = 0; i < N * N; i++) positions.push(i);
  shuffle(positions);

  positions.forEach(pos => {
    const x = pos % N;
    const y = Math.floor(pos / N);
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.draggable = true;
    piece.dataset.correct = pos;
    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.backgroundImage = `url('${currentImage}')`;
    piece.style.backgroundSize = '600px 600px';
    piece.style.backgroundPosition = `-${x * pieceSize}px -${y * pieceSize}px`;
    puzzle.appendChild(piece);
  });

  initDragAndDrop();
  victory.style.display = 'none';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initDragAndDrop() {
  let dragged = null;

  puzzle.querySelectorAll('.piece').forEach(piece => {
    piece.addEventListener('dragstart', () => {
      dragged = piece;
      piece.classList.add('dragging');
    });

    piece.addEventListener('dragend', () => {
      piece.classList.remove('dragging');
    });

    piece.addEventListener('dragover', e => {
      e.preventDefault();
    });

    piece.addEventListener('drop', e => {
      e.preventDefault();
      const target = e.target;
      if (target.classList.contains('piece') && target !== dragged) {
        const draggedNext = dragged.nextSibling;
        const targetNext = target.nextSibling;
        const parent = puzzle;
        parent.insertBefore(dragged, targetNext);
        parent.insertBefore(target, draggedNext);
        checkWin();
      }
    });
  });
}

function checkWin() {
  const pieces = Array.from(puzzle.children);
  const isCorrect = pieces.every((piece, index) =>
    parseInt(piece.dataset.correct, 10) === index
  );

  if (isCorrect) {
    victory.style.display = 'block';
    addPoints(rewardPoints);
  }
}

function goToMenu() {
  window.location.href = 'pièces.html';
}

window.addEventListener('load', startGame);
