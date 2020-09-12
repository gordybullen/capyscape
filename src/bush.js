export default class Bush {
  constructor(options) {
    this.sx = 0;
    this.sy = 0;
    this.sw = 32;
    this.sh = 112;
    this.scale = 1.25;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image;
    this.image.src = './bush.png';
    this.game = options.game;
    this.pos = options.pos;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.pos[0], this.pos[1], this.width, this.height);
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI);
    // ctx.fillStyle = "rgb(224, 197, 121)";
    // ctx.fill();
    // ctx.closePath();
  }
}