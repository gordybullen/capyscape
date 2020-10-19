import Game from "./game";
import Jason from "./jason";

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    // this.game = new Game();
    this.lastTime = 0;
    this.gameMenu = document.getElementById("start-menu");
    this.startButton = document.querySelector(".start-button");
    // this.menuTitle = document.querySelector(".menu-title");
    // this.menuText = document.querySelector(".menu-text");
    this.inProgress = false;
    this.lives = document.querySelector(".lives");
    this.round = 1;

    this.bindMenuHandlers();
  }

  start() {
    this.game = new Game(this.ctx);
    this.inProgress = true;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.lives.innerHTML = `Lives: ${this.game.lives}`;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    if (this.roundOver()) {
      this.gameMenu.classList.toggle("hide");
      this.lives.classList.toggle("hide");
      this.inProgress = false;
    } else if (this.game.reset) {
      this.game.jason.pos = [this.game.DIM_X - 84, 0];
      this.game.reset = false;
      requestAnimationFrame(this.animate.bind(this));
    } else {
      // every call to animate requests causes another call to animate
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  roundOver() {
    if (this.game.gameOver) {
      cancelAnimationFrame(this.animate.bind(this));
      this.round += 1;

      // this.menuTitle.innerHTML = levels[this.round].menuTitle;
      // this.menuText.innerHTML = levels[this.round].menuText;

      // if (this.round < 5) {
      //   this.startButton.innerHTML = "Start";
      // } else {
      //   this.startButton.innerHTML = "Play Again";
      //   this.round = 1;
      // }

      return true;
      // } else if (this.game.lost()) {
      //   window.cancelAnimationFrame(this.animationRequestId);
      //   this.menuTitle.innerHTML = "Not Quite!";
      //   this.menuText.innerHTML =
      //     "";
      //   this.startButton.innerHTML = "Play Again";

      //   this.round = 1;
      //   return true;
    }

    return false;
  }

  bindMenuHandlers() {
    const startGame = () => {
      this.gameMenu.classList.toggle("hide");
      this.start();
    };

    this.startButton.addEventListener("click", () => {
      if (!this.inProgress) startGame();
    });

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && !this.inProgress) startGame();
    });
  }
}

export default GameView;
