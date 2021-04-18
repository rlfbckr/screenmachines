
const maxpoints = 100;
var t = -50;
var c = 0;
var speed = 0.01;
var transparancy = 100;
var offset = 0;
var noisescale = 0.1;
var noiseamp = 30;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  background(255);
  noFill();
  frameRate(100);
  strokeWeight(1);

}

function draw() {
  //background(0, 1);
 // stroke(255,100);
 
 if (c % 3 == 0) stroke(255, 0, 0, transparancy);
  if (c % 3 == 1) stroke(0, 255, 0, transparancy);
  if (c % 3 == 2) stroke(0, 0, 255, transparancy);

  beginShape();
  for (var i = 0; i < maxpoints; i++) {
    var x = t % width;
    var y = map(i, 0, maxpoints - 1, -noiseamp, height + noiseamp);
    x += map(noise(i * noisescale, t * speed),0,1,-noiseamp,noiseamp);
    y += map(noise(i * noisescale, t * speed), 0, 1, -noiseamp, noiseamp);
    vertex(x, y);
  }
  endShape();
  t += 3;
  c++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}