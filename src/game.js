import Util from "./util";
import Jason from "./jason";
import Farmer from "./farmer";
import Forest from "./forest";
import Bush from "./bush";

const BUSH_POSITIONS = [
  [1200 / 1.5, 0 + 75],
  [1200 / 1.5, 600 / 2 + 50],
];

class Game {
  constructor() {
    this.DIM_X = 1200;
    this.DIM_Y = 600;
    this.BG_COLOR = "green";
    this.BG_IMAGE = new Image();
    this.BG_IMAGE.src = "crops_overhead.jpeg";
    this.NUM_FARMERS = 8;
    this.NUM_BUSHES = 2;
    this.jason = new Jason({ pos: [this.DIM_X - 84, 0], game: this });
    this.farmers = [];
    this.bushes = [];
    this.forest = new Forest({ pos: [0, this.DIM_Y / 4], game: this });
    this.lives = 3;
    this.reset = false;
    this.gameOver = false;

    this.addFarmers();
    this.addBushes();
  }

  add(object) {
    if (object instanceof Farmer) {
      this.farmers.push(object);
    } else if (object instanceof Bush) {
      this.bushes.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  allObjects() {
    return [].concat(this.jason, this.farmers, this.bushes, this.forest);
  }

  allMovingObjects() {
    return [].concat(this.farmers, this.jason);
  }

  automatedObjects() {
    return [].concat(this.farmers);
  }

  addFarmers() {
    for (let i = 0; i < this.NUM_FARMERS; i++) {
      this.add(new Farmer({ pos: [400, 200], game: this }));
    }
  }

  addBushes() {
    for (let i = 0; i < this.NUM_BUSHES; i++) {
      this.add(new Bush({ pos: BUSH_POSITIONS[i], game: this }));
    }
  }

  randomPosition() {
    return [this.DIM_X * Math.random(), this.DIM_Y * Math.random()];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    // ctx.fillStyle = this.BG_COLOR;
    ctx.drawImage(this.BG_IMAGE, 0, 0, this.DIM_X, this.DIM_Y);
    // ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    this.allObjects().forEach((object) => object.draw(ctx));
  }

  moveObjects(timeDelta) {
    this.automatedObjects().forEach((object) => object.move(timeDelta));
  }

  wrap(pos) {
    return [Util.wrap(pos[0], this.DIM_X), Util.wrap(pos[1], this.DIM_Y)];
  }

  isOutOfBounds(object) {
    return (
      object.pos[0] < 0 + object.sw ||
      object.pos[1] < 0 + object.sh ||
      object.pos[0] > this.DIM_X - object.sw * 3 ||
      object.pos[1] > this.DIM_Y - object.sh * 3
    );
  }

  checkFarmerCollisions() {
    for (let i = 0; i < this.NUM_FARMERS; i++) {
      for (let j = 0; j < this.NUM_FARMERS; j++) {
        const obj1 = this.farmers[i];
        const obj2 = this.farmers[j];

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
    for (let i = 0; i < this.NUM_BUSHES; i++) {
      const stationaryObj = this.bushes[i];
      const collided = this.jason.isCollidedWith(stationaryObj);
      if (collided) this.jason.collideWithStationaryObject(stationaryObj);
    }
  }

  checkFarmerStationaryObjectCollisions() {
    for (let i = 0; i < this.NUM_BUSHES; i++) {
      for (let j = 0; j < this.NUM_FARMERS; j++) {
        const stationaryObj = this.bushes[i];
        const collided = this.farmers[j].isCollidedWith(stationaryObj);
        if (collided)
          this.farmers[j].collideWithStationaryObject(stationaryObj);
      }
    }
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.checkFarmerCollisions();
    this.checkJasonStationaryObjectCollisions();
    this.checkFarmerStationaryObjectCollisions();
    this.checkMovingObjectCollisions();
  }

  // remove(object) {
  //   if (object instanceof Farmer) {
  //     this.farmers.splice(this.farmers.indexOf(object), 1);
  //   } else if (object instanceof Bush) {
  //     this.bushes.splice(this.bushes.indexOf(object), 1);
  //   }
  // }
}

export default Game;
