import Game from "./game";

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

    this.bindMenuHandlers();
  }

  start() {
    this.game = new Game(this.ctx);
    this.inProgress = true;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
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
