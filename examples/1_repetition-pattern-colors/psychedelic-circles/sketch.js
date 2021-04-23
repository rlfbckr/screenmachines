let osc, playing, freq, amp;

var pointsPerCircle = 100;
var radius = 300;
var drehung = 0;
var t = 0;
var blend = 0.2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(25);
  osc = new p5.Oscillator('sine');
 // osc.start();
  osc.freq(freq, 1000);
  osc.amp(amp, 0.5);
  background(0, blend * 255);
}

function draw() {
  background(0, 10);
  if (t % 3 == 0) stroke(255, 0, 0, 200);
  if (t % 3 == 1) stroke(0, 255, 0, 200);
  if (t % 3 == 2) stroke(0, 0, 255, 200);
  strokeWeight(2);
  for (var winkel = 0; winkel < 360; winkel = winkel + (360 / pointsPerCircle)) {
    var xpos = cos(winkel + drehung) * radius;
    var ypos = sin(winkel + drehung) * radius;
    line(width / 2, height / 2, (width / 2) + xpos, (height / 2) + ypos);
  }
  drehung = drehung + 0.09; //map(mouseX,0,width-1,-10,10);
  radius = 250 + (400 * sin(millis() * 0.03));
  osc.amp(map(radius, 250, 650, 0.1, 0.8), 0.2);
  osc.freq(drehung + (10 + (radius / 2)), 0.2);
  t++;
}