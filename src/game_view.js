import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game;
    this.lastTime = 0;
  };

  start() {
    // start the animation
    // setInterval(() => {
    //   this.game.farmer.frames += 1;
    // }, 0.5)
    
    requestAnimationFrame(this.animate.bind(this));
  };

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    // every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  };
};

export default GameView;