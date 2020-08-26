import MovingObject from './moving_object';
import Util from './util';

class Farmer extends MovingObject {
  constructor(options) {
    super(options);
    this.dx = 5;
    this.dy = -5;
    this.sx = 0;
    this.sy = 0;
    this.sw = 27;
    this.sh = 33;
    this.scale = 3;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image;
    this.image.src = './farmer_walk_left.png';
    this.speed = 4;
    this.vel = Util.randomVec(this.speed);
    this.radius = 20;
    // this.rightPressed = false;
    // this.leftPressed = false;
    // this.upPressed = false;
    // this.downPressed = false;
  };

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
      this.image.src = './farmer_walk_left.png';
    } else {
      this.image.src = './farmer_walk_right.png';
    }

    if (this.game.isOutOfBounds(this)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else if (this.pos[0] + this.sw * 3 > this.game.DIM_X || this.pos[0] < 0) {
        this.vel[0] = -this.vel[0];
      } else if (this.pos[1] < 0 || this.pos[1] + this.sh * 3 > this.game.DIM_Y) {
        this.vel[1] = -this.vel[1];
      }
    }

    if (Util.dist(this.pos, this.game.jason.pos) < 400) {
      this.vel = Util.scale(Util.dir([-(this.pos[0] - this.game.jason.pos[0]), -(this.pos[1] - this.game.jason.pos[1])]), this.speed + this.speed / 6);

      // if (this.pos[0] < this.game.jason.pos[0] && Math.sign(this.vel[0]) === 1) {
      //   this.vel[1] = -Math.atan2(this.pos[1] - this.game.jason.pos[1], this.pos[0] - this.game.jason.pos[0]);
      // } else if (this.pos[0] < this.game.jason.pos[0] && Math.sign(this.vel[0]) === -1) {
      //   this.vel[1] = Math.atan2(this.pos[1] - this.game.jason.pos[1], this.pos[0] - this.game.jason.pos[0]);
      // } else if (this.pos[0] > this.game.jason.pos[0] && Math.sign(this.vel[0]) === -1) {
      //   this.vel[1] = -Math.atan2(this.pos[1] - this.game.jason.pos[1], this.pos[0] - this.game.jason.pos[0]);
      //   this.vel[0] = -this.vel[0];
      // } else if (this.pos[0] > this.game.jason.pos[0] && Math.sign(this.vel[0]) === 1) {
      //   this.vel[1] = Math.atan2(this.pos[1] - this.game.jason.pos[1], this.pos[0] - this.game.jason.pos[0]);
      // }
      // this.vel[0] = Math.atan2(this.pos[1] - this.game.jason.pos[1], this.pos[0] - this.game.jason.pos[0]);
    }
  }

  // move() {
  //   if (Util.dist(this.pos, this.game.jason.pos) < 200) {
  //     this.dest = this.game.jason.pos;
  //   }
  //   // else if (Util.distance(this.dest, this.pos) < 5) {
  //   //   this.dest = this.randomVec();
  //   // }
  // }

  draw(ctx) {
    // if (window.rightPressed) {
    //   this.image.src = './farmer_walk_right.png';
    // } else if (window.leftPressed) {
    //   this.image.src = './farmer_walk_left.png';
    // } 

    // if (window.rightPressed) {
    //   this.image.src = './capy_walk_right_flipped.png';
    // } else if (window.leftPressed) {
    //   this.image.src = './capy_walk_left.png';
    // } else if (window.downPressed) {
    //   this.image.src = './capy_walk_down.png';
    // } else if (window.upPressed) {
    //   this.image.src = './capy_walk_up.png';
    // }

    // if (window.rightPressed) {
    //   this.pos[0] += this.dx;
    //   if (this.pos[0] + this.dx + this.width > this.game.DIM_X) {
    //     this.pos[0] = this.game.DIM_X - this.width;
    //   }
    // } else if (window.leftPressed) {
    //   this.pos[0] -= this.dx;
    //   if (this.pos[0] < 0) {
    //     this.pos[0] = 0;
    //   }
    // }

    // if (window.upPressed) {
    //   this.pos[1] += this.dy;
    //   if (this.pos[1] + this.dy < 0) {
    //     this.pos[1] = 0;
    //   }
    // } else if (window.downPressed) {
    //   this.pos[1] -= this.dy;
    //   if (this.pos[1] - this.dy + this.height > this.game.DIM_Y) {
    //     this.pos[1] = this.game.DIM_Y - this.height;
    //   }
    // }

    // if (window.upPressed && !window.rightPressed) {
    //   window.frames += 1;
    // } else if (window.downPressed && !window.leftPressed) {
    //   window.frames += 1;
    // } else if (window.upPressed && window.rightPressed) {
    //   window.frames += 1;
    // } else if (window.downPressed && window.leftPressed) {
    //   window.frames += 1;
    // } else if (!window.upPressed && window.rightPressed) {
    //   window.frames += 1;
    // } else if (!window.downPressed && window.leftPressed) {
    //   window.frames += 1;
    // }

    // switch (window.frames) {
    //   case 0:
    //     this.sx = 0;
    //     break;
    //   case 8:
    //     this.sx = 27;
    //     break;
    //   case 16:
    //     this.sx = 54;
    //     break;
    //   case 24:
    //     this.sx = 81;
    //     break;
    //   case 32:
    //     this.sx = 108;
    //     break;
    //   case 40:
    //     this.sx = 135;
    //     break;
    //   case 48:
    //     this.sx = 162;
    //     break;
    //   case 56:
    //     this.sx = 189;
    //     break;
    //   default:
    //     break;
    // }

    // if (window.frames > 56) {
    //   this.sx = 0;
    //   window.frames = 0;
    // }

    ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.pos[0], this.pos[1], this.width, this.height);
  };
};

export default Farmer;