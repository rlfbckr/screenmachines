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
	fill(0, 100);
	//	noFill();
	anzahl_punkte = mouseX / 100;
	random_range = mouseY / 50;
	for (var iy = 0; iy < anzahl_punkte; iy++) {
		var y = map(iy, 0, anzahl_punkte - 1, rand, windowWidth - rand);
		for (var ix = 0; ix < anzahl_punkte; ix++) {
			var x = map(ix, 0, anzahl_punkte - 1, rand, windowWidth - rand);

			rect(x + random(-random_range, random_range), y + random(-random_range, random_range), 100, 100);
		}
	}

}

