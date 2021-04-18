
const maxpoints = 100;
var t = -20;
var speed = 0.01;
var trans = 120;
var noisescale = 0.1;
var noiseamp = 50;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(0);
  noFill();

}

function draw() {
  background(0, 1);
  if (t % 3 == 0) stroke(255, 0, 0, trans);
  if (t % 3 == 1) stroke(0, 255, 0, trans);
  if (t % 3 == 2) stroke(0, 0, 255, trans);
  beginShape();
  for (var i = 0; i < maxpoints; i++) {
    var x = t % width;
    var y = map(i, 0, maxpoints - 1, -noiseamp, height + noiseamp);
    x += noise(i * noisescale, t * speed) * noiseamp;
    y += map(noise(i * noisescale, t * speed), 0, 1, 0, noiseamp);
    vertex(x, y);
  }
 endShape();
  t += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}