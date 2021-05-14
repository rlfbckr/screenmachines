/*
  Ralf Baecker 2021
  vera molnars quadrat mit linien
*/

var maxpoints = 5; // wieviele punkte
var margin = 100; // wieviel rand (open, unten, rechts, links)
var snake_max_lenth = 4;
let snake_pointsx = [];
let snake_pointsy = [];
var snakeposx = 0;
var snakeposy = 0;

function setup() {
  createCanvas(600, 600); // wie gross ist die zeichenfläche
  frameRate(100);

  snake_pointsx.push(0);
  snake_pointsy.push(0);
  print(snake_pointsx.length);
  background(0);
}

function draw() {
  background(0,128); // hintergrundfarbe
  stroke(255); // stiftfarbe
  strokeWeight(1); // stiftdicke
  /*
  for (var y = 0; y < maxpoints; y++) { // für jede zeile
    for (var x = 0; x < maxpoints; x++) { // für jede spalte
      point(pos2screenX(x), pos2screenY(y));

    }
  }
  */
  stroke(255);
  noFill();
  beginShape();
  for (var i = 0; i < snake_pointsx.length; i++) {
    vertex(pos2screenX(snake_pointsx[i]),pos2screenY(snake_pointsy[i]));
  }
  endShape();
//  ellipse(pos2screenX(snakeposx), pos2screenX(snakeposy), 20, 20);


  snakeposx = constrain(snakeposx + int(random(-2, 2)), 0, maxpoints-1);
  snakeposy = constrain(snakeposy + int(random(-2, 2)), 0, maxpoints-1);
  
  snake_pointsx.push(snakeposx);
  snake_pointsy.push(snakeposy);
}

function pos2screenX(x) {
  return map(x, 0, maxpoints - 1, margin, width - margin);
}

function pos2screenY(y) {
  return map(y, 0, maxpoints - 1, margin, width - margin);
}