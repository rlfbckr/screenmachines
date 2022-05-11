var time = 0;
var radius = 500;
var speed = 0.1;
var x_drift = 0.9;
var y_drift = 1.1;
var r = 255;
var g = 255;
var b = 255;
var change_intervall = 3000;
var xpos_last = 0;
var ypos_last = 0;
var lastchange = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(120);
  textSize(30);
}

function draw() {
  // background(0,20);
  var xpos = (width / 2) + (sin(time * x_drift) * radius);
  var ypos = (height / 2) + (cos(time * y_drift) * radius);
  //stroke(128);
  //line((width/2), (height/2),(width/2)+xpos, (height/2)+ypos);
  strokeWeight(50);
  stroke(r, g, b, 255);
  // ellipse((width / 2) + xpos, (height / 2) + ypos, 20);
  if (xpos_last != 0 && ypos_last != 0) {
    line(xpos_last, ypos_last, xpos, ypos);
  }
  xpos_last = xpos;
  ypos_last = ypos;
  time = time + speed;

  if ((millis() - lastchange) > change_intervall) {
    //  background(0);
    x_drift = random(0.5, 1.2);
    y_drift = random(0.5, 1.2);
    r = random(40, 255);
    g = random(40, 255);
    b = random(40, 255);
    radius = random(100, 500);
    xpos_last = 0;
    ypos_last = 0;
    lastchange = millis()
  }
  noStroke();
  fill(255, 0, 255);
  text("millis=" + int(millis()) + "  lastchange=" + int(lastchange), 40, 40);
}
