/*
	vera molnars quadrat
*/

var maxpoints = 4; // wievile punkte
var margin = 100; // wieviel rand

function setup() {
  createCanvas(600,600); // wie gross ist die zeichenfläche
}

function draw() {
  background(0); // hintergrundfarbe
  stroke(255); // stiftfarbe
  strokeWeight(1); // stiftdicke
  for (var y= 0; y<maxpoints;y++) {
    for (var x= 0; x<maxpoints;x++) {
      point(map(x,0,maxpoints-1,margin,width-margin),map(y,0,maxpoints-1,margin,width-margin));
    }
  }
}