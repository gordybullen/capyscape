import Game from "./game";
import levels from "./levels";

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.lastTime = 0;
    this.gameMenu = document.getElementById("start-menu");
    this.startButton = document.querySelector(".start-button");
    this.menuTitle = document.querySelector(".menu-title");
    this.menuText = document.querySelector(".menu-text");
    this.inProgress = false;
    this.gameInfo = document.querySelector(".game-info");
    this.corndogs = document.querySelector(".corndogs");
    this.lives = document.querySelector(".lives");
    this.round = 1;

    this.bindMenuHandlers();
  }

  start() {
    this.game = new Game(this.ctx, levels[this.round]);
    this.inProgress = true;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.lives.innerHTML = `Lives: ${this.game.lives}`;
    this.corndogs.innerHTML = `Corndogs: ${this.game.NUM_CORNDOGS}`;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    if (this.roundOver()) {
      this.gameMenu.classList.toggle("hide");
      this.gameInfo.classList.toggle("hide");
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
      this.menuTitle.innerHTML = "Try again? Jason needs you!";
      this.menuText.innerHTML = "Hints: ...";
      this.startButton.innerHTML = "Play Again";
      this.round = 1;
      return true;
    } else if (this.game.passedRound()) {
      this.round += 1;
      if (this.round !== 4) {
        cancelAnimationFrame(this.animate.bind(this));
        this.menuTitle.innerHTML = levels[this.round].menuTitle;
        this.menuText.innerHTML = levels[this.round].menuText;
        this.startButton.innerHTML = "Keep going";
        return true;
      } else {
        this.round = 1;
        cancelAnimationFrame(this.animate.bind(this));
        this.menuTitle.innerHTML = "YOU MADE IT!!!";
        this.menuText.innerHTML = "Jason is with his fam.";
        this.startButton.innerHTML = "Play Again";
        return true;
      }
    }
    return false;
  }

  bindMenuHandlers() {
    const startGame = () => {
      this.gameMenu.classList.toggle("hide");
      this.gameInfo.classList.toggle("hide");
      this.start();
    };

    this.startButton.addEventListener("click", () => {
      if (!this.inProgress) startGame();
    });

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 && !this.inProgress) startGame();
    });

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 32 && this.inProgress) this.game.addCorndog();
    });
  }
}

export default GameView;
