var time = 0;
var radius = 1;
var radius_goto = 1;
var speed = 0.01;
var strokeweight = 5;
var strokeweight_goto = 5;
var x_drift = 0.9;
var y_drift = 1.1;
var x_drift_goto = 0.9;
var y_drift_goto = 1.1;
var r = 255;
var g = 255;
var b = 255;
var r_goto = 255;
var g_goto = 255;
var b_goto = 255;

var change_intervall = 3000;
var xpos_last = 0;
var ypos_last = 0;
var lastchange = 0;

var fade_speed = 0.03;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(120);
  textSize(30);
}

function draw() {
  background(0, 20);
  // variable tween / drift
  x_drift = (x_drift * (1 - fade_speed)) + (x_drift_goto * fade_speed);
  y_drift = (y_drift * (1 - fade_speed)) + (y_drift_goto * fade_speed);
  radius = (radius * (1 - fade_speed)) + (radius_goto * fade_speed);
  strokeweight = (strokeweight * 0.99) + (strokeweight_goto * fade_speed);
  r = (r * (1 - fade_speed)) + (r_goto * fade_speed);
  g = (g * (1 - fade_speed)) + (g_goto * fade_speed);
  b = (b * (1 - fade_speed)) + (b_goto * fade_speed);

  var xpos = (width / 2) + (sin(time * x_drift) * radius);
  var ypos = (height / 2) + (cos(time * y_drift) * radius);

  // var xpos = (width / 2) + map(noise(100000,time*2, x_drift),0,1,-radius,radius);
  // var ypos = (height / 2) + map(noise(0,time*2, y_drift),0,1,-radius,radius);

  //stroke(128);
  //line((width/2), (height/2),(width/2)+xpos, (height/2)+ypos);
  strokeWeight(strokeweight);
  stroke(r, g, b, 250);
  // ellipse((width / 2) + xpos, (height / 2) + ypos, 20);
  if (xpos_last != 0 && ypos_last != 0) {
    line(xpos_last, ypos_last, xpos, ypos);
  }
  xpos_last = xpos;
  ypos_last = ypos;
  time = time + speed;

  if ((millis() - lastchange) > change_intervall) {
    //  background(0);
    x_drift_goto = random(0.5, 1.2);
    y_drift_goto = random(0.5, 1.2);
    r_goto = random(40, 255);
    g_goto = random(40, 255);
    b_goto = random(40, 255);
    radius_goto = random(500, 500);
    strokeweight_goto = random(1, 89);

    lastchange = millis()
  }
  noStroke();
  fill(255, 0, 255);
  // text("millis=" + int(millis()) + "  lastchange=" + int(lastchange), 40, 40);
}
