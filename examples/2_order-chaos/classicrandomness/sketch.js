/*
  Ralf Baecker 2021
  vera molnars quadrat
*/

var maxpoints = 20; // wieviele punkte
var margin = 50; // wieviel rand (open, unten, rechts, links)
var randomoffset = 10;
function setup() {
  createCanvas(600,600,WEBGL); // wie gross ist die zeichenfläche
  rectMode(CENTER);
  angleMode(DEGREES); 
 //frameRate(1);
 randomSeed(6999); // 6999 war ganz cool.  
 maxpoints = int(random(5,20));

}

function draw() {

  background(0); // hintergrundfarbe
  stroke(255); // stiftfarbe
  strokeWeight(1); // stiftdicke
  noFill();


  for (var y= 0; y<maxpoints;y++) { // für jede zeile
    for (var x= 0; x<maxpoints;x++) { // für jede spalte
      push();
      translate(map(x,0,maxpoints-1,(-width/2)+margin,(width/2)-margin),map(y,0,maxpoints-1,(-height/2)+margin,(height/2)-margin));
      translate(random(-randomoffset,randomoffset),random(-randomoffset,randomoffset));
     
      rotateZ(random(0,180)); // gib mit eine zufallszahl zwischen 0 und 90
      rect(0,0,10); //random(40,80));
      pop();
    }
  }
 noLoop(); // rufe die draw funktion nur einmal auf.
}