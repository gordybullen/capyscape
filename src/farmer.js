import MovingObject from './moving_object';

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
    this.image.src = '../farmer_walk_left.png';
    // this.rightPressed = false;
    // this.leftPressed = false;
    // this.upPressed = false;
    // this.downPressed = false;
  };

  draw(ctx) {
    if (window.rightPressed) {
      this.image.src = '../farmer_walk_right.png';
    } else if (window.leftPressed) {
      this.image.src = '../farmer_walk_left.png';
    } 

    // if (window.rightPressed) {
    //   this.image.src = '../capy_walk_right_flipped.png';
    // } else if (window.leftPressed) {
    //   this.image.src = '../capy_walk_left.png';
    // } else if (window.downPressed) {
    //   this.image.src = '../capy_walk_down.png';
    // } else if (window.upPressed) {
    //   this.image.src = '../capy_walk_up.png';
    // }

    if (window.rightPressed) {
      this.pos[0] += this.dx;
      if (this.pos[0] + this.dx + this.width > this.game.DIM_X) {
        this.pos[0] = this.game.DIM_X - this.width;
      }
    } else if (window.leftPressed) {
      this.pos[0] -= this.dx;
      if (this.pos[0] < 0) {
        this.pos[0] = 0;
      }
    }

    if (window.upPressed) {
      this.pos[1] += this.dy;
      if (this.pos[1] + this.dy < 0) {
        this.pos[1] = 0;
      }
    } else if (window.downPressed) {
      this.pos[1] -= this.dy;
      if (this.pos[1] - this.dy + this.height > this.game.DIM_Y) {
        this.pos[1] = this.game.DIM_Y - this.height;
      }
    }

    if (window.upPressed && !window.rightPressed) {
      window.frames += 1;
    } else if (window.downPressed && !window.leftPressed) {
      window.frames += 1;
    } else if (window.upPressed && window.rightPressed) {
      window.frames += 1;
    } else if (window.downPressed && window.leftPressed) {
      window.frames += 1;
    } else if (!window.upPressed && window.rightPressed) {
      window.frames += 1;
    } else if (!window.downPressed && window.leftPressed) {
      window.frames += 1;
    }

    switch (window.frames) {
      case 0:
        this.sx = 0;
        break;
      case 8:
        this.sx = 27;
        break;
      case 16:
        this.sx = 54;
        break;
      case 24:
        this.sx = 81;
        break;
      case 32:
        this.sx = 108;
        break;
      case 40:
        this.sx = 135;
        break;
      case 48:
        this.sx = 162;
        break;
      case 56:
        this.sx = 189;
        break;
      default:
        break;
    }

    if (window.frames > 56) {
      this.sx = 0;
      window.frames = 0;
    }

    ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.pos[0], this.pos[1], this.width, this.height);
  };
};

export default Farmer;