# capyscape

Try the game [here](https://gordybullen.github.io/capyscape/)!

## About
Capyscape is a browser-based game in which the player, a capybara named Jason, must try to avoid the farmers and escape the farm to find his family in the forest. Jason can set traps in the form of corndogs to slow the farmers and reach the forest.

## Technologies
Capyscape was built using:
* HTML5 Canvas
* JavaScript ES6
* CSS3

## How to Play
As Jason, you can navigate around the farm by using the arrow keys. If you get too close to a farmer, they will begin to follow you at an increased speed until you are able to lose them or reach the forest. Once a farmer is locked on to you, they will move faster than you can run away; this is where the corndogs come in. You can place a corndog by pressing the Spacebar. If a farmer runs into a corndog they will slow down significantly. However, they will also grow in size, so be careful!

In order to make it through a level, you must reach the forest on the other side of the pasture without getting caught. You have 3 chances to pass a level before it's game over. Each level has a differrent layout of bushes and farmers to navigate, so you'll have to think on your toes!

## Main Features

### OOP: Classes and Inheritance (ES6)
I uses classes and inheritance to allow for DRYer code and separation of logic. I created parent classes for certain objects that shared functionality, such as moving objects, and then subclasses with unique functionality for the specific entity.

```js
import Util from "./util";

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = false;
    this.NORMAL_FRAME_TIME_DELTA = 1000 / 60;
  }

  

  isCollidedWith(otherObject) {
    ...
  }

  collideWith(otherObject) {}
}
```

```js
import MovingObject from "./moving_object";
import Util from "./util";
import Jason from "./jason";
import Bush from "./bush";
import Corndog from "./corndog";

class Farmer extends MovingObject {
  constructor(options) {
    super(options);
    this.dx = 3;
    this.dy = -3;
    this.sx = 0;
    this.sy = 0;
    this.sw = 27;
    this.sh = 33;
    this.scale = 3;
    this.width = this.sw * this.scale;
    this.height = this.sh * this.scale;
    this.image = new Image();
    this.image.src = "./farmer_walk_left.png";
    this.speed = 2 * this.game.speedMultiplier;
    this.vel = Util.randomVec(this.speed);
    this.frames = 0;
    this.radius = 20;
  }

  move(timeDelta = timeDelta || 1) {
    ...
  }

  collideWith(otherObject) {
    ...
  }

  collideWithStationaryObject(stationaryObj) {
    ...
  }

  draw(ctx) {
    ...
  }
}
```


