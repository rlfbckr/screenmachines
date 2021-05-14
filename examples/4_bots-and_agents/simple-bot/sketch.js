/*
  Ralf Baecker 2021
  simple bot
*/
let myBots = [];


function setup() {
  createCanvas(600, 600); // wie gross ist die zeichenfläche
  for (var i = 0; i < 100; i++) {
    myBots.push(new Bot(random(0, width), height));
  }
}

function draw() {
  background(0, 0, 255);
  for (var i = 0; i < myBots.length; i++) {
    myBots[i].update();
    if (myBots[i].alive == 0) {
      myBots.splice(i, 1);
      myBots.push(new Bot(random(0, width), height));
    }
    myBots[i].draw();

  }
}

class Bot {
  constructor(x, y) {
    // initalisierung
    this.pos = createVector(x, y);
    this.speed = random(0.1, 5);
    this.color = color(random(255), random(255), random(255));
    this.size = random(2, 30);
    this.alive = 1;
  }

  update() {
    // verhalten
    this.pos.x = this.pos.x + random(-2, 2);
    this.pos.y = this.pos.y + random(-1, 1);
    this.pos.y = this.pos.y - this.speed;
    if (this.pos.y < -20) {
      this.alive = 0;
    }

  }

  draw() {
    // aussehen / zeichen
    stroke(255);
    fill(this.color, 128);
    // noFill();
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
  }
}