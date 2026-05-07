const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

const cols = 20;
const rows = 20;
const size = canvas.width / cols;

let grid = [];
let current;
let stack = [];
let player = { x: 0, y: 0 };

const playerImg = new Image();
playerImg.src = './image/rio.png';

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  draw() {
    const x = this.x * size;
    const y = this.y * size;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;

    const drawLine = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    if (this.walls[0]) drawLine(x, y, x + size, y);
    if (this.walls[1]) drawLine(x + size, y, x + size, y + size);
    if (this.walls[2]) drawLine(x + size, y + size, x, y + size);
    if (this.walls[3]) drawLine(x, y + size, x, y);
  }

  highlight(color = '#00ff00') {
    const x = this.x * size;
    const y = this.y * size;
    ctx.fillStyle = color;
    ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
  }

  getUnvisitedNeighbors() {
    const neighbors = [];
    const top = grid[index(this.x, this.y - 1)];
    const right = grid[index(this.x + 1, this.y)];
    const bottom = grid[index(this.x, this.y + 1)];
    const left = grid[index(this.x - 1, this.y)];

    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
      return neighbors[Math.floor(Math.random() * neighbors.length)];
    }
    return undefined;
  }
}

function index(x, y) {
  if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
  return x + y * cols;
}

function removeWalls(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  if (dx === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (dx === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (dy === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (dy === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function generateMaze() {
  grid = [];
  stack = [];
  player = { x: 0, y: 0 };
  hasWon = false;
  document.getElementById('victory-message').style.display = 'none';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid.push(new Cell(x, y));
    }
  }

  current = grid[0];
  current.visited = true;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.forEach(cell => cell.draw());
    current.highlight('#2222ff');

    const next = current.getUnvisitedNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
      requestAnimationFrame(step);
    } else if (stack.length > 0) {
      current = stack.pop();
      requestAnimationFrame(step);
    } else {
      drawPlayer();
    }
  }

  step();
}

function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.forEach(cell => cell.draw());

  const endCell = grid[index(cols - 1, rows - 1)];
  endCell.highlight('#ff0000');

  const cell = grid[index(player.x, player.y)];
  const x = cell.x * size;
  const y = cell.y * size;
  const imgSize = size * 0.8;
  const imgX = x + (size - imgSize) / 2;
  const imgY = y + (size - imgSize) / 2;

  if (playerImg.complete && playerImg.naturalWidth !== 0) {
    ctx.drawImage(playerImg, imgX, imgY, imgSize, imgSize);
  } else {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(x + 2, y + 2, size - 4, size - 4);
  }
}

let hasWon = false;

function showVictory() {
  if (!hasWon) {
    hasWon = true;
    addPoints(10);
    const message = document.getElementById('victory-message');
    message.style.display = 'block';
  }
}

function movePlayer(dx, dy) {
  const currentCell = grid[index(player.x, player.y)];
  if (!currentCell) return;

  if (dx === 0 && dy === -1 && !currentCell.walls[0]) player.y--;
  else if (dx === 1 && dy === 0 && !currentCell.walls[1]) player.x++;
  else if (dx === 0 && dy === 1 && !currentCell.walls[2]) player.y++;
  else if (dx === -1 && dy === 0 && !currentCell.walls[3]) player.x--;

  player.x = Math.max(0, Math.min(player.x, cols - 1));
  player.y = Math.max(0, Math.min(player.y, rows - 1));

  drawPlayer();
  if (player.x === cols - 1 && player.y === rows - 1) {
    showVictory();
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  else if (e.key === 'ArrowRight') movePlayer(1, 0);
  else if (e.key === 'ArrowDown') movePlayer(0, 1);
  else if (e.key === 'ArrowLeft') movePlayer(-1, 0);
});

generateMaze();
