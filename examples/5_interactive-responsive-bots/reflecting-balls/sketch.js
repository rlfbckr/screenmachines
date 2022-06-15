/*
  Ralf Baecker 2021
  bouncing balls
*/
let myBots = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // wie gross ist die zeichenfläche
  for (var i = 0; i < 10; i++) {
    myBots.push(new Bot(random(0, width), random(0, height)));
  }
  background(0, 0, 255);
}

function draw() {
  background(0, 0, 255);
  for (var i = 0; i < myBots.length; i++) {
    myBots[i].update();
    if (myBots[i].alive == 0) {
      myBots.splice(i, 1); // alten bot löschen
      myBots.push(new Bot(random(0, width), random(0, height))); // neuen bot erzeugen!!
    }
    myBots[i].draw();

  }
fill(0,0,255);
  text(frameRate(),40,40)
}

class Bot {
  constructor(x, y) {
    // initalisierung
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));

    this.color = color(random(255),random(255,random(255)));
    this.size = 200;
    this.alive = 1;
  }

  update() {
    // verhalten
    // bouncing ballls
    this.position.add(this.velocity);
    // einfallswinkel = ausfallswinkel
    if (this.position.x <= 0) this.velocity.x*=-1;
    if (this.position.x >= width) this.velocity.x*=-1;
    if (this.position.y <= 0) this.velocity.y*=-1;
    if (this.position.y >= height) this.velocity.y*=-1;
  }

  draw() {
    // aussehen / zeichen
    noStroke(); //(255);
    fill(this.color, 128);
    ellipse(this.position.x, this.position.y, this.size, this.size)
    stroke(255,128);
    strokeWeight(1);
   
  }
}