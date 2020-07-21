import MovingObject from './moving_object';

class Jason extends MovingObject {
  constructor(options) {
    super(options);
    this.dx = 7;
    this.dy = -7;
    this.sx = 0;
    this.sy = 0;
    this.sw = 28;
    this.sh = 21;
    this.scale = 4;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image;
    this.image.src = '../mini_capy.png';
    // this.rightPressed = false;
    // this.leftPressed = false;
    // this.upPressed = false;
    // this.downPressed = false;
  };
  
  draw(ctx) {
    if (window.leftPressed) {
      this.image.src = '../mini_capy.png'
    } else if (window.rightPressed) {
      this.image.src = '../mini_capy.png';
    }

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (window.rightPressed) {
      this.pos[0] += this.dx;
      if (this.pos[0] + this.dx > this.game.DIM_X - this.radius) {
        this.pos[0] = this.game.DIM_X - this.radius;
      }
    } else if (window.leftPressed) {
      this.pos[0] -= this.dx;
      if (this.pos[0] - this.dx < 0 + this.radius) {
        this.pos[0] = this.radius;
      }
    }

    if (window.upPressed) {
      this.pos[1] += this.dy;
      if (this.pos[1] + this.dy < this.radius) {
        this.pos[1] = this.radius;
      }
    } else if (window.downPressed) {
      this.pos[1] -= this.dy;
      if (this.pos[1] - this.dy > this.game.DIM_Y - this.radius) {
        this.pos[1] = this.DIM_Y - this.radius;
      }
    }

    if (window.upPressed && !window.rightPressed) {
      window.frames += 150;
    } else if (window.downPressed && !window.leftPressed) {
      window.frames += 150;
    } else if (window.upPressed && window.rightPressed) {
      window.frames += 150;
    } else if (window.downPressed && window.leftPressed) {
      window.frames += 150;
    } else if (!window.upPressed && window.rightPressed) {
      window.frames += 150;
    } else if (!window.downPressed && window.leftPressed) {
      window.frames += 150;
    }

    switch (window.frames) {
      case 0:
        this.sx = 0;
        break;
      // case 150:
      //   this.sx = 0;
      //   break;
      case 1200:
        this.sx = 28;
        break;
      case 2400:
        this.sx = 56;
        break;
      case 3600:
        this.sx = 84;
        break;
      case 4800:
        this.sx = 112;
        break;
      case 6000:
        this.sx = 140;
        break;
      default:
        break;
    }

    if (window.frames > 6000) {
      this.sy = 0;
      window.frames = 0;
    }

    ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.pos[0], this.pos[1], this.width, this.height);
  };
};

export default Jason;