/*
	vera molnars quadrat
*/

var maxpoints = 4; // wievile punkte
var margin = 100; // rand

function setup() {
  createCanvas(600,600);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  for (var y= 0; y<maxpoints;y++) {
    for (var x= 0; x<maxpoints;x++) {
      point(map(x,0,maxpoints-1,margin,width-margin),map(y,0,maxpoints-1,margin,width-margin));
    }
  }
}