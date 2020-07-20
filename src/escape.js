const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 7;
let dy = -7;
let ballRadius = 20;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const keyDownHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = true;
  } else if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = true;
  }
}

const keyUpHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    upPressed = false;
  } else if (e.key === 'Down' || e.key === 'ArrowDown') {
    downPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'brown';
  ctx.fill();
  ctx.closePath();
}

drawCoordinates = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`x: ${x}, y: ${y}`, 8, 20)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawCoordinates();

  if (rightPressed) {
    x += dx;
    if (x + dx > canvas.width - ballRadius) {
      x = canvas.width - ballRadius;
    }
  } else if (leftPressed) {
    x -= dx;
    if (x - dx < 0 + ballRadius) {
      x = ballRadius;
    } 
  }

  if (upPressed) {
    y += dy;
    if (y + dy < ballRadius) {
      y = ballRadius;
    }
  } else if (downPressed) {
    y -= dy;
    if (y - dy > canvas.height - ballRadius) {
      y = canvas.height - ballRadius;
    }
  }

  requestAnimationFrame(draw);
}

draw();