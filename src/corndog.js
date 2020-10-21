export default class Corndog {
  constructor(options) {
    this.sx = 0;
    this.sy = 0;
    this.sw = 460;
    this.sh = 750;
    this.scale = 0.1;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image();
    this.image.src = "./corndog.png";
    this.game = options.game;
    this.pos = options.pos;
  }

  draw(ctx) {
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
