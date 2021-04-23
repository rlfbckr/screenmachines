let osc, playing, freq, amp;

var pointsPerCircle = 100;
var radius = 300;
var drehung = 0;
var t = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
  frameRate(25);
 osc = new p5.Oscillator('sine');
 osc.start();

 osc.freq(freq, 1000);
 osc.amp(amp, 0.5);
}

function draw() {
//background(255); 
 
  if (t%3 == 0)  background(255,0,0);
  if (t%3 == 1)  background(0,255,0);
  if (t%3 == 2)  background(0,0,255);
 stroke(255);
  for (var winkel = 0; winkel < 360; winkel = winkel + (360 / pointsPerCircle)) {
    var xpos = cos(winkel + drehung) * radius;
    var ypos = sin(winkel + drehung) * radius;
    line(width / 2, height / 2, (width / 2) + xpos, (height / 2) + ypos);
  }
  drehung = drehung+0.3; //map(mouseX,0,width-1,-10,10);
  //radius = mouseY/2;
   radius = 250 +(200 * sin(millis()*0.1));
   osc.amp(map(radius,250,450,0.1,0.9),0.5); 

   osc.freq(drehung+ (10+(radius/2)),0.2); 
   t++;
}