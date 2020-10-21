import Util from "./util";
import Jason from "./jason";
import Farmer from "./farmer";
import Forest from "./forest";
import Bush from "./bush";
import Corndog from "./corndog";

const BUSH_POSITIONS = [
  [200, 0 + 75],
  [200, 600 / 2 + 50],
  [200, 300 - 168 / 2],
];

class Game {
  constructor(ctx, levelData) {
    this.DIM_X = 1200;
    this.DIM_Y = 600;
    this.BG_COLOR = "green";
    this.BG_IMAGE = new Image();
    this.BG_IMAGE.src = "crops_overhead.jpeg";
    this.NUM_FARMERS = levelData.numFarmers;
    this.NUM_BUSHES = levelData.numBushes;
    this.NUM_CORNDOGS = 10 + levelData.corndogsAdded;
    this.speedMultiplier = levelData.farmerSpeedMultiplier;
    this.jason = new Jason({ pos: [this.DIM_X - 84, 0], game: this });
    this.farmers = [];
    this.bushes = [];
    this.corndogs = [];
    this.forest = new Forest({
      pos: [0, this.DIM_Y / 2 - 256 / 2],
      game: this,
    });
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
    } else if (object instanceof Corndog) {
      this.corndogs.push(object);
    } else {
      throw new Error("unknown type of object");
    }
  }

  allObjects() {
    return [].concat(
      this.jason,
      this.farmers,
      this.bushes,
      this.forest,
      this.corndogs
    );
  }

  allMovingObjects() {
    return [].concat(this.farmers, this.jason);
  }

  automatedObjects() {
    return [].concat(this.farmers);
  }

  stationaryObjects() {
    return [].concat(this.bushes, this.corndogs);
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

  addCorndog() {
    if (this.NUM_CORNDOGS > 0) {
      this.NUM_CORNDOGS -= 1;

      let pos = Array.from(this.jason.pos);
      switch (this.jason.direction()) {
        case "left":
          pos = [pos[0] - this.jason.width / 2, pos[1]];
          break;
        case "right":
          pos = [pos[0] + this.jason.width, pos[1]];
          break;
        case "up":
          pos = [pos[0], (pos[1] -= 50)];
          break;
        case "down":
          pos = [pos[0], (pos[1] += 50)];
          break;
      }

      this.add(new Corndog({ pos, game: this }));
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
      object.pos[0] < 0 + object.width ||
      object.pos[1] < 0 + object.height ||
      object.pos[0] > this.DIM_X - object.width ||
      object.pos[1] > this.DIM_Y - object.height
    );
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
    for (let i = 0; i < this.bushes.length; i++) {
      const stationaryObj = this.bushes[i];
      const collided = this.jason.isCollidedWith(stationaryObj);
      if (collided) this.jason.collideWithStationaryObject(stationaryObj);
    }
  }

  checkFarmerStationaryObjectCollisions() {
    const stationaryObjects = this.stationaryObjects();
    for (let i = 0; i < stationaryObjects.length; i++) {
      for (let j = 0; j < this.farmers.length; j++) {
        const stationaryObj = stationaryObjects[i];
        const collided = this.farmers[j].isCollidedWith(stationaryObj);
        if (collided)
          this.farmers[j].collideWithStationaryObject(stationaryObj);
      }
    }
  }

  remove(object) {
    if (object instanceof Farmer) {
      this.farmers.splice(this.farmers.indexOf(object), 1);
    } else if (object instanceof Corndog) {
      this.corndogs.splice(this.bushes.indexOf(object), 1);
    }
  }

  passedRound() {
    return (
      this.jason.pos[0] === 0 &&
      this.jason.pos[1] > this.forest.pos[1] &&
      this.jason.pos[1] < this.forest.pos[1] + this.forest.height
    );
  }

  step(timeDelta) {
    console.log(this.farmers);
    this.moveObjects(timeDelta);
    this.checkJasonStationaryObjectCollisions();
    this.checkFarmerStationaryObjectCollisions();
    this.checkMovingObjectCollisions();
  }
}

export default Game;
