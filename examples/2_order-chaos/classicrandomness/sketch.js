/*
  Ralf Baecker 2021
  vera molnars quadrat
*/

var maxpoints = 5; // wieviele punkte
var margin = 150; // wieviel rand (open, unten, rechts, links)
var randomoffset = 10;
var state = 0;
function setup() {
  createCanvas(windowWidth, windowWidth, WEBGL); // wie gross ist die zeichenfläche
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(1);
  randomSeed(6999); // 6999 war ganz cool.  
  //maxpoints = int(random(5,20));
  //margin = int(random(50,200));
  ortho();

}

function draw() {
  if (state == 0) {
    background(0, 0, 255); // hintergrundfarbe
    stroke(255); // stiftfarbe
  } else if (state == 1) {
    stroke(0, 0, 255); // hintergrundfarbe
    background(255); // stiftfarbe
  }
  if (int(random(20)) == 0) { // wahrscheinlichkeit von 1 zu 5
    state = !state;
  }

  strokeWeight(1.3); // stiftdicke
  noFill();

  for (var y = 0; y < maxpoints; y++) { // für jede zeile
    for (var x = 0; x < maxpoints; x++) { // für jede spalte
      push();
      translate(map(x, 0, maxpoints - 1, (-width / 2) + margin, (width / 2) - margin), map(y, 0, maxpoints - 1, (-height / 2) + margin, (height / 2) - margin));
      rotateZ(int(random(6)) * 20); // gib mit eine zufallszahl zwischen 0 und 90
      rotateY(int(random(6)) * 20); // gib mit eine zufallszahl zwischen 0 und 90
      rotateX(int(random(6)) * 20); // gib mit eine zufallszahl zwischen 0 und 90
      box(50);
      //      line(-25,0,25,0);
      pop();
    }
  }
  //noLoop(); // rufe die draw funktion nur einmal auf.
}