/*
  Ralf Baecker 2021
  perlin demo
*/
var amp =50;
var step = 9;
var noisezoom = 0.02;

function setup() {
  createCanvas(700, 700, WEBGL); // wie gross ist die zeichenfläche
  textSize(30);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
}

function draw() {
  scale(0.6);
  push();
rotateX(40);
  background(0, 0, 255); // hintergrundfarbe
  stroke(255);
  strokeWeight(1);
  noFill();
  for (var y = -height / 2; y <= height / 2; y = y + step) {
    beginShape();
    for (var x = -width / 2; x <= width / 2; x = x + step) {
      var val  = map(noise((x - 1000) * noisezoom, (y - 1000) * noisezoom,millis() * 0.0001), 0, 1, -amp, amp);
      vertex(x, y,  val);
    }
    endShape();

  }

  pop();
  //fill(255);
  //text(int(millis()),width/2,height/2);
  //noLoop();
}