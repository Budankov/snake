const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/ground.png';

const carrots = new Image();
carrots.src = 'img/carrots.png';

const keys = new Image();
keys.src = 'img/keys.png';

let box = 32;

let score = 0;

const control = 'control:';

let food = {
  x: ~~(Math.random() * 17 + 1) * box,
  y: ~~(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(e) {
  if (e.keyCode == 37 && dir != 'right') dir = 'left';
  else if (e.keyCode == 38 && dir != 'down') dir = 'up';
  else if (e.keyCode == 39 && dir != 'left') dir = 'right';
  else if (e.keyCode == 40 && dir != 'up') dir = 'down';
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
  }
}

function drawGame() {
  ctx.clearRect(0, 0, 609, 609);
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(keys, 500, 10, 80, 80);
  ctx.drawImage(carrots, food.x, food.y);

  for (let i = 0; i < snake.length; i += 1) {
    ctx.fillStyle = i == 0 ? 'green' : 'red';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '40px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);
  ctx.fillText(control, 385, 50, 100);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score += 1;
    food = {
      x: ~~(Math.random() * 17 + 1) * box,
      y: ~~(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game), alert('Ви програли 😭!, щоб зіграти знову, оновіть сторінку!');

  if (dir == 'left') snakeX -= box;
  if (dir == 'right') snakeX += box;
  if (dir == 'up') snakeY -= box;
  if (dir == 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
