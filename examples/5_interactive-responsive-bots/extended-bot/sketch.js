/*
  Ralf Baecker 2021
  extended bots ...
*/
let myBots = [];
let speed = 2;
let gravitation;
function setup() {
  createCanvas(windowWidth, windowHeight); // wie gross ist die zeichenfläche
randomSeed(1);
  for (var i = 0; i < 10; i++) {
    bot = new Bot(random(0, width), random(0, height), random(15, 50));
    myBots.push(bot);
  }
  gravitation = createVector(0,10);
  frameRate(60);
  background(0, 0, 255);
  let a = 10;
  let b = a;
  print("b="+b);

  let vectorA = createVector(1,2,3);
  print("vectorA = " + vectorA.x+ " " + vectorA.y+ " " + vectorA.z);
  let vectorB = vectorA; // .copy();
  print("vectorB = " + vectorB.x+ " " + vectorB.y+ " " + vectorB.z);
  vectorB.x = 100;
  print("vectorB = " + vectorB.x+ " " + vectorB.y+ " " + vectorB.z);
  print("vectorA = " + vectorA.x+ " " + vectorA.y+ " " + vectorA.z);

}

function draw() {
  background(0, 0, 255);
  for (var i = 0; i < myBots.length; i++) {
      myBots[i].update(); // verhalten
     if (myBots[i].age()>myBots[i].lifetime) {
      myBots.splice(i, 1); // alten bot löschen
       myBots.push(new Bot(random(0, width), random(0, height), random(15, 50))); // neuen bot erzeugen!!
     }
 
    
    myBots[i].draw();

  }
  fill(0, 0, 255);
  text(int(frameRate())+ " " + int(millis()), 40, 40)
}

class Bot {
  constructor(x, y, size) {
    // initalisierung
    this.position = createVector(x, y);
    this.velocity = createVector(random(-5, 5), random(-5, 5));
    this.birthtime = millis();
    this.color = color(255);
    this.size = size;
    this.alive = 1;
    this.lifetime = random(1000,2000);
  }

  age() {
    return millis() - this.birthtime;
  }

  update() {
  
    this.modifiedvelocity = this.velocity.copy();
    this.modifiedvelocity.mult(speed);
    //this.position.add(gravitation);
    this.position.add(this.modifiedvelocity);
    // einfallswinkel = ausfallswinkel
    if (this.position.x <= 0) this.velocity.x *= -1;
    if (this.position.x >= width) this.velocity.x *= -1;
    if (this.position.y <= 0) this.velocity.y *= -1;
    if (this.position.y >= height) this.velocity.y *= -1;
  }

  draw() {
    // aussehen / zeichen
    // noStroke(); //(255);
    noFill();
    stroke(this.color, 128);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}