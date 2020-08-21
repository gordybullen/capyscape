import Util from './util';
import Jason from './jason';
import Farmer from './farmer';


class Game {
  constructor() {
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.BG_COLOR = 'green';
    // this.jason = new Jason({ pos: [(this.DIM_X / 2) - 28, (this.DIM_Y / 2) - 21], game: this });
    this.jason = new Jason({ pos: [0, 0], game: this });
    this.farmer = new Farmer({ pos: [(this.DIM_X / 2) - 27, (this.DIM_Y / 2) - 33], game: this });
  };

  // add(object) {
  //   if (object instanceof Asteroid) {
  //     this.asteroids.push(object);
  //   } else if (object instanceof Bullet) {
  //     this.bullets.push(object);
  //   } else if (object instanceof Ship) {
  //     this.ships.push(object);
  //   } else {
  //     throw new Error("unknown type of object");
  //   }
  // };

  allObjects() {
    // return [].concat(this.jason, this.farmer);
    return [].concat(this.farmer);
  };

  randomPosition() {
    return [
      this.DIM_X * Math.random(),
      this.DIM_Y * Math.random()
    ];
  };

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    // const img = new Image;
    // img.src = '../mini_capy.png';
    // ctx.drawImage(img, 0, 0, this.DIM_X, this.DIM_Y)

    this.allObjects().forEach(object => object.draw(ctx));
  };

  moveObjects(timeDelta) {
    this.allObjects().forEach(object => object.move(timeDelta));
  };

  wrap(pos) {
    return [
      Util.wrap(pos[0], this.DIM_X), Util.wrap(pos[1], this.DIM_Y)
    ];
  };

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > this.DIM_X) || (pos[1] > this.DIM_Y);
  };

  checkCollisions() {
    const allObjects = this.allObjects();

    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2) && obj1 !== obj2) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  };

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkCollisions();
  };

  // remove(object) {
  //   if (object instanceof Asteroid) {
  //     this.asteroids.splice(this.asteroids.indexOf(object), 1);
  //   } else if (object instanceof Bullet) {
  //     this.bullets.splice(this.bullets.indexOf(object), 1);
  //   }
  // };
};

export default Game;