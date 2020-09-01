import GameView from './game_view';
import MovingObject from './moving_object';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1200;
  canvas.height = 700;
  window.MovingObject = MovingObject;
  window.ctx = ctx;
  window.frames = 0;
  const gameView = new GameView(ctx);
  gameView.start();
});


const keyDownHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    window.rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    window.leftPressed = true;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    window.upPressed = true;
  } else if (e.key === 'Down' || e.key === 'ArrowDown') {
    window.downPressed = true;
  }
}

const keyUpHandler = e => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    window.rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    window.leftPressed = false;
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    window.upPressed = false;
  } else if (e.key === 'Down' || e.key === 'ArrowDown') {
    window.downPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);