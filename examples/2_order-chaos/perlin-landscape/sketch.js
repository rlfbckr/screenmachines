/*
  Ralf Baecker 2021
  perlin landscape
  Unknown Pleasures - Joy Division
*/
var easycam;
var amp = 120;
var xstep = 10;
var ystep = 20;
var noisezoom = 0.008;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  textSize(30);
  textAlign(CENTER, CENTER);
strokeCap(ROUND);
  // some fix from https://github.com/diwi/p5.EasyCam/issues/5
  Dw.EasyCam.prototype.apply = function (n) {
    var o = this.cam;
    n = n || o.renderer,
      n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
  };
 // easycam = createEasyCam(p5.RendererGL, {distance:1});
  easycam = new Dw.EasyCam(this._renderer, {distance:1100});

}

function draw() {
  push();
  angleMode(DEGREES);
  rotateX(76);
  background(0, 0, 255); // hintergrundfarbe
  stroke(255);
  strokeWeight(0.8);
  noFill();
  for (var y = -height / 2; y <= height / 2; y = y + ystep) {
    beginShape();
    for (var x = -width / 2; x <= width / 2; x = x + xstep) {
      var ramp = map(abs(x), 0, width , -1, 1);
      var val = map(noise((x - 1000) * noisezoom,
        (y - 1000) * noisezoom,
        millis() * 0.0001),
        0, 1, -amp, amp);

      vertex(x, y, val * ramp);
    }
    endShape();

  }

  pop();
  //fill(255);
  //text(int(millis()),width/2,height/2);
  //noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0, 0, windowWidth, windowHeight]);
}