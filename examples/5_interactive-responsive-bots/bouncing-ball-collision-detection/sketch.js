/*
  Ralf Baecker 2021
  bouncing balls extened... 
*/
let myBots = [];
let gravitation;
let friction = 0.7;
let lastspawn = 0;
function setup() {
  createCanvas(windowWidth, windowHeight); // wie gross ist die zeichenfläche
 // randomSeed(1);
  for (var i = 0; i < 10; i++) {
    bot = new Bot(random(0, width), 0, random(10, 40));
    myBots.push(bot);
  }
  gravitation = createVector(0,0.9);
  frameRate(60);
  background(0, 0, 255);
  textSize(200);
  textAlign(CENTER,CENTER);
}

function draw() {
  if ((millis()-lastspawn) > 10000) {
    bot = new Bot(random(0, width), 0, random(10, 40));
    myBots.push(bot);
    lastspawn = millis();
  }
  background(0, 0, 255,100);
  for (var i = 0; i < myBots.length; i++) {
    myBots[i].update(); // verhalten
    myBots[i].checkCollions();
    if (!myBots[i].alive) {
      myBots.splice(i, 1); // alten bot löschen
    } else {
      myBots[i].draw();
    }
  }
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
    this.lifetime = random(1000, 2000);
  }
  age() {
    return millis() - this.birthtime;
  }

  checkCollions()  {
    for (let i = 0; i< myBots.length;i++) {
      if (this != myBots[i]) {
        let distance = dist(this.position.x,this.position.y,myBots[i].position.x,myBots[i].position.y);
        let minimale_distance = ((this.size/2)+(myBots[i].size/2));
        if (distance <= minimale_distance) {

        let dx = myBots[i].position.x - this.position.x;
          let dy = myBots[i].position.y - this.position.y;
          let a = atan2(dy, dx);
          this.velocity.mult(-1);
          myBots[i].velocity.mult(-1);
          let tx = this.position.x + cos(a) *(minimale_distance*1.1);
          let ty = this.position.y + sin(a) *(minimale_distance*1.1);
          myBots[i].position.x = tx;
          myBots[i].position.y = ty;
        }
      }

    }
  }

  update() {
    this.velocity.add(gravitation);
    this.position.add(this.velocity);
    
    // einfallswinkel = ausfallswinkel
    if ((this.position.x - this.size / 2) <= 0) {
      this.position.x =  (this.size / 2);
      this.velocity.x *= -friction;
    }
    if ((this.position.x + this.size / 2) >= width) {
      this.position.x = width - (this.size / 2);
      this.velocity.x *= -friction;
    }
    if ((this.position.y - this.size / 2) <= 0) {
      this.position.y =  (this.size / 2);
      this.velocity.y *= -friction;
    }
    if ((this.position.y + this.size / 2) >= height) {
      this.position.y = height - (this.size / 2);
      this.velocity.y *= -friction;

    }
    // this.position.x = constrain(this.position.x, 0,width);
    // this.position.y = constrain(this.position.y, 0,height);
    /*
    if (this.age() > this.lifetime) {
      this.alive = 0;
    }
    */
  }

  draw() {
    // aussehen / zeichen
    // noStroke(); //(255);
    //noFill();
    noStroke();
    fill(this.color, 128);
    ellipse(this.position.x, this.position.y, this.size, this.size);
      //rect(this.position.x, this.position.y,this.size,this.size);
/*
      push();
    translate(this.position.x, this.position.y);
    rotate(millis()*0.001);
    beginShape();
    vertex(this.size/2,-this.size/2);
    vertex(this.size/2,this.size/2);
    vertex(-this.size/2,0);
    endShape(CLOSE);
    pop();
    */
    }
}