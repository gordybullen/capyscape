import Util from './util';

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = false;
    this.NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  };

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  move(timeDelta = timeDelta || 1) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    // const velocityScale = timeDelta / this.NORMAL_FRAME_TIME_DELTA;
    // const offsetX = this.vel[0] * velocityScale;
    // const offsetY = this.vel[1] * velocityScale;

    // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    // if (this.game.isOutOfBounds(this.pos)) {
    //   if (this.isWrappable) {
    //     this.pos = this.game.wrap(this.pos);
    //   } else {
    //     this.game.remove(this);
    //   }
    // }
  };

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  collideWith(otherObject) {

  };
};

export default MovingObject;