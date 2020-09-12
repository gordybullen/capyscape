import Util from './util';
import Jason from './jason';
import Farmer from './farmer';
import Forest from './forest';
import Bush from './bush';

class Game {
  constructor() {
    this.DIM_X = 1200;
    this.DIM_Y = 700;
    this.BG_COLOR = 'green';
    this.NUM_FARMERS = 1;
    this.NUM_BUSHES = 2;
    this.jason = new Jason({ pos: [this.DIM_X - 84, 0], game: this });
    this.farmer = new Farmer({ pos: [500, 300], game: this });
    this.farmer2 = new Farmer({ pos: [500, 300], game: this });
    this.forest = new Forest({ pos: [0, this.DIM_Y / 4], game: this });
    this.bush1 = new Bush({ pos: [this.DIM_X / 1.5, 0 + 100], game: this });
    this.bush2 = new Bush({ pos: [this.DIM_X / 1.5, (this.DIM_Y / 2) + 100], game: this });
  }

  allObjects() {
    return [].concat(this.farmer, this.jason, this.farmer2, this.forest, this.bush1, this.bush2);
  }

  allMovingObjects() {
    return [].concat(this.farmer, this.jason, this.farmer2);
  }

  allStationaryObjects() {
    return [].concat(this.allBushes());
  }

  allFarmers() {
    if (this.farmer2) {
      return [].concat(this.farmer, this.farmer2);
    } else {
      return [this.farmer];
    }
  }

  allBushes() {
    if (this.bush2) {
      return [].concat(this.bush1, this.bush2);
    } else {
      return [this.bush];
    }
  }

  randomPosition() {
    return [
      this.DIM_X * Math.random(),
      this.DIM_Y * Math.random()
    ];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    // const img = new Image;
    // img.src = '../mini_capy.png';
    // ctx.drawImage(img, 0, 0, this.DIM_X, this.DIM_Y)

    this.allObjects().forEach(object => object.draw(ctx));
  }

  moveObjects(timeDelta) {
    // this.allObjects().forEach(object => object.move(timeDelta));
    this.farmer.move(timeDelta);
    this.farmer2.move(timeDelta);
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], this.DIM_X), Util.wrap(pos[1], this.DIM_Y)
    ];
  }

  isOutOfBounds(object) {
    return (object.pos[0] < 0 + object.sw) || (object.pos[1] < 0 + object.sh) ||
      (object.pos[0] > this.DIM_X - object.sw * 3) || (object.pos[1] > this.DIM_Y - object.sh * 3);
  }

  checkFarmerCollisions() {
    const allFarmers = this.allFarmers();

    for (let i = 0; i < allFarmers.length; i++) {
      for (let j = 0; j < allFarmers.length; j++) {
        const obj1 = allFarmers[i];
        const obj2 = allFarmers[j];

        if (obj1.isCollidedWith(obj2) && obj1 !== obj2) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  checkMovingObjectCollisions() {
    const allMovingObjects = this.allMovingObjects();

    for (let i = 0; i < allMovingObjects.length; i++) {
      for (let j = 0; j < allMovingObjects.length; j++) {
        const obj1 = allMovingObjects[i];
        const obj2 = allMovingObjects[j];

        if (obj1.isCollidedWith(obj2) && obj1 !== obj2) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  checkJasonStationaryObjectCollisions() {
    for (let i = 0; i < this.allStationaryObjects().length; i++) {
      const stationaryObj = this.allStationaryObjects()[i];
      const collided = this.jason.isCollidedWith(stationaryObj);
      if (collided) this.jason.collideWithStationaryObject(stationaryObj);
    }
  }

  checkFarmerStationaryObjectCollisions() {
    for (let i = 0; i < this.allStationaryObjects().length; i++) {
      for (let j = 0; j < this.allFarmers().length; j++) {
        const stationaryObj = this.allStationaryObjects()[i];
        const collided = this.allFarmers()[j].isCollidedWith(stationaryObj);
        if (collided) this.allFarmers()[j].collideWithStationaryObject(stationaryObj);
      }
    }
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkFarmerCollisions();
    // this.checkMovingObjectCollisions();
    this.checkJasonStationaryObjectCollisions();
    this.checkFarmerStationaryObjectCollisions();
  }

  // remove(object) {
  //   if (object instanceof Asteroid) {
  //     this.asteroids.splice(this.asteroids.indexOf(object), 1);
  //   } else if (object instanceof Bullet) {
  //     this.bullets.splice(this.bullets.indexOf(object), 1);
  //   }
  // }
}

export default Game;