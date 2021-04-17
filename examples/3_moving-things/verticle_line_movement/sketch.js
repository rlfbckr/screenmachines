
const maxpoints = 100;
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < maxpoints; i++) {
    let p = createVector(0, map(i, 0, maxpoints - 1, -100, height+100));
    points.push(p);
  }
  rectMode(CENTER);
  background(0);
}

function draw() {
 // background(0,100);
  stroke(255,220);
  noFill();
  beginShape();
  let allout = 0;
  for (var i = 0; i < points.length; i++) {
    let p = points[i];
    vertex(p.x, p.y);
    p.x = p.x + random(1, 3);
    p.y = p.y + random(-2, 2);
    if (p.x>=width) allout++;
  }
  if (allout == points.length) {
    for (var i = 0; i < points.length; i++) {
      let p = points[i];
      p.x = 0;
    }
  }
  endShape();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}