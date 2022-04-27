var rand = 150;
var anzahl_punkte = 10;
var random_range = 5;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(25);
	rectMode(CENTER);
 
	//	noLoop();
}

function draw() { // wird dauernd im loop aufgerufen
	background(255);
	noStroke();
	//	noFill();
	anzahl_punkte = int(mouseX / 100);
	random_range = mouseY / 50;
	var c = 0;
	for (var iy = 0; iy < anzahl_punkte; iy++) {
		var y = map(iy, 0, anzahl_punkte - 1, rand, windowWidth - rand);
		for (var ix = 0; ix < anzahl_punkte; ix++) {
			var x = map(ix, 0, anzahl_punkte - 1, rand, windowWidth - rand);
			if (c%3 == 0) {
				fill(255,0,0, 180);
			} else if (c%3 == 1) {
				fill(0,255,0, 180);
			} else {
				fill(0,0,255, 180);
			}
			rect(x + random(-random_range, random_range), y + random(-random_range, random_range), 100, 100);
			c++;
		}
	}

}

