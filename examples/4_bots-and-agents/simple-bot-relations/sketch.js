/*
  Ralf Baecker 2021
  simple ballons
*/
let myBots = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // wie gross ist die zeichenfläche
  for (var i = 0; i < 150; i++) {
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
    this.pos = createVector(x, y);
    this.targetpos = createVector(random(width), random(height));
    this.speed = random(0.1, 5);
    this.color = color(255);
    this.size = 5;
    this.alive = 1;
  }

  update() {
    // verhalten
    //brownian movement
//    this.pos.x = this.pos.x + random(-2, 2);
//    this.pos.y = this.pos.y + random(-2, 2);
    this.pos.x = (this.pos.x*0.99) + (this.targetpos.x*0.01);
    this.pos.y = (this.pos.y*0.99) + (this.targetpos.y*0.01);
    if (p5.Vector.dist(this.pos, this.targetpos) < 10) {
      this.targetpos = createVector(random(width), random(height));
    }


    // soll im bildschirm bleiben
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);

  }

  draw() {
    // aussehen / zeichen
    noStroke(); //(255);
    fill(this.color, 128);
    // noFill();
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    stroke(255,128);
    strokeWeight(1);
    for (var i = 0; i<myBots.length;i=i+2) {
      if (this != myBots[i]){ // nicht ich
        if (dist(this.pos.x,this.pos.y, myBots[i].pos.x,myBots[i].pos.y)<60) {
          line(this.pos.x,this.pos.y, myBots[i].pos.x,myBots[i].pos.y);
        }
      } 

    }
  }
}