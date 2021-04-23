var pointsPerCircle = 100;
var radius = 300;
var drehung = 0;

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
}

function draw() {
  background(228);
  for (var winkel = 0; winkel < 360; winkel = winkel + (360 / pointsPerCircle)) {
    var xpos = cos(winkel + drehung) * radius;
    var ypos = sin(winkel + drehung) * radius;
    line(width / 2, height / 2, (width / 2) + xpos, (height / 2) + ypos);
  }
  drehung = drehung - 0.1;
}