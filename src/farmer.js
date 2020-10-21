import MovingObject from "./moving_object";
import Util from "./util";
import Jason from "./jason";
import Bush from "./bush";
import Corndog from "./corndog";

class Farmer extends MovingObject {
  constructor(options) {
    super(options);
    this.dx = 3;
    this.dy = -3;
    this.sx = 0;
    this.sy = 0;
    this.sw = 27;
    this.sh = 33;
    this.scale = 3;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image();
    this.image.src = "./farmer_walk_left.png";
    this.speed = 2 * this.game.speedMultiplier;
    this.vel = [1, 1]
    // this.vel = Util.randomVec(this.speed);
    this.frames = 0;
    this.radius = 20;
  }

  move(timeDelta = timeDelta || 1) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // in this case the MovingObject should move farther in this frame
    // velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / this.NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (Math.sign(this.vel[0]) === -1) {
      this.image.src = "./farmer_walk_left.png";
    } else {
      this.image.src = "./farmer_walk_right.png";
    }

    if (this.game.isOutOfBounds(this)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else if (
        this.pos[0] + this.width > this.game.DIM_X ||
        this.pos[0] < 0
      ) {
        this.vel[0] = -this.vel[0];
      } else if (
        this.pos[1] < 0 ||
        this.pos[1] + this.height > this.game.DIM_Y
      ) {
        this.vel[1] = -this.vel[1];
      }
    }

    // if Jason is in range of farmer, farmer will lock on to Jason
    if (Util.dist(this.pos, this.game.jason.pos) < 250) {
      this.vel = Util.scale(
        Util.dir([
          -(this.pos[0] - this.game.jason.pos[0]),
          -(this.pos[1] - this.game.jason.pos[1]),
        ]),
        this.speed + 0.75
      );
    }

    if (Util.dist(this.pos, this.game.jason.pos) > 250 && !this.change) {
      this.vel = Util.randomVec(this.speed);
      this.change = true;
    }
  }

  collideWith(otherObject) {
    if (otherObject instanceof Farmer && this.frames % 100 === 0) {
      this.vel[0] = -this.vel[0];
    } else if (otherObject instanceof Bush && this.frames % 100 === 0) {
      this.vel[0] = -this.vel[0];
    } else if (otherObject instanceof Jason) {
      this.game.lives -= 1;
      this.game.reset = true;
      if (this.game.lives === 0) {
        this.game.gameOver = true;
      }
    }
  }

  collideWithStationaryObject(stationaryObj) {
    if (stationaryObj instanceof Bush) {
      this.vel[0] = -this.vel[0];
    } else if (stationaryObj instanceof Corndog) {
      this.width *= 1.1;
      this.height *= 1.1;
      this.speed *= 0.5;
      this.game.remove(stationaryObj);
      // this.game.remove(this);
    }
    // if (this.pos[0] < stationaryObj.pos[0] + stationaryObj.width && this.pos[0] + this.width > stationaryObj.pos[0] &&
    //   this.pos[1] < stationaryObj.pos[1] + stationaryObj.height && this.pos[1] + this.height > stationaryObj.pos[1]) {
    //       this.vel[0] = -this.vel[0];
    // }
  }

  draw(ctx) {
    this.frames += 1;

    // moves from the farmer walk sprite sheet over time
    if (this.frames % 10 === 0) {
      this.sx += 27;
    }

    // loop back to beginning of the sheet once we get to the last frame
    if (this.sx > 189) {
      this.sx = 0;
      this.frames = 0;
    }

    ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

export default Farmer;
