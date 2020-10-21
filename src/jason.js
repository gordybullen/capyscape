import MovingObject from "./moving_object";

class Jason extends MovingObject {
  constructor(options) {
    super(options);
    this.dx = 2.5;
    this.dy = -2.5;
    this.sx = 0;
    this.sy = 0;
    this.sw = 28;
    this.sh = 21;
    this.scale = 3;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image();
    this.image.src = "./capy_walk_left.png";
  }

  direction() {
    if (this.image.src.includes("right")) {
      return "right";
    } else if (this.image.src.includes("left")) {
      return "left";
    } else if (this.image.src.includes("up")) {
      return "up";
    } else if (this.image.src.includes("down")) {
      return "down";
    }
  }

  collideWithStationaryObject(stationaryObj) {
    // if (this.pos[0] < stationaryObj.pos[0] + stationaryObj.width && this.pos[0] + this.width > stationaryObj.pos[0] &&
    //   this.pos[1] < stationaryObj.pos[1] + stationaryObj.height && this.pos[1] + this.height > stationaryObj.pos[1]) {
    //     if (this.pos[0] > stationaryObj.pos[0] + stationaryObj.width / 2) {
    //       this.pos[0] += this.dx;
    //     }
    //     if (this.pos[0] < stationaryObj.pos[0] + stationaryObj.width / 2) {
    //       this.pos[0] -= this.dx;
    //     }
    // }
    if (this.isCollidedWith(stationaryObj)) {
      const obj1CenterPos = [
        this.pos[0] + this.width / 2,
        this.pos[1] + this.height / 2,
      ];
      const obj2CenterPos = [
        stationaryObj.pos[0] + stationaryObj.width / 2,
        stationaryObj.pos[1] + stationaryObj.height / 2,
      ];

      if (obj1CenterPos[0] > obj2CenterPos[0]) {
        this.pos[0] += this.dx;
      } else if (obj1CenterPos[0] < obj2CenterPos[0]) {
        this.pos[0] -= this.dx;
      }
    }
  }

  draw(ctx) {
    if (window.rightPressed) {
      this.image.src = "./capy_walk_right_flipped.png";
    } else if (window.leftPressed) {
      this.image.src = "./capy_walk_left.png";
    } else if (window.downPressed) {
      this.image.src = "./capy_walk_down.png";
    } else if (window.upPressed) {
      this.image.src = "./capy_walk_up.png";
    }

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
        this.sx = 28;
        break;
      case 16:
        this.sx = 56;
        break;
      case 24:
        this.sx = 84;
        break;
      case 32:
        this.sx = 112;
        break;
      default:
        break;
    }

    if (window.frames > 32) {
      this.sx = 0;
      window.frames = 0;
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

export default Jason;
