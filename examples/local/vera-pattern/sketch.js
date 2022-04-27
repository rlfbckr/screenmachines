var rand = 150;
var anzahl_punkte = 15;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(25);
	//noLoop();
}

function draw() { // wird dauernd im loop aufgerufen
	background(0, 0, 255);
	stroke(255);
	for (var iy = 0; iy < anzahl_punkte; iy++) {
		var y = map(iy, 0, anzahl_punkte - 1, rand, windowWidth - rand);
		for (var ix = 0; ix < anzahl_punkte; ix++) {
			var x = map(ix, 0, anzahl_punkte - 1, rand, windowWidth - rand);
			strokeWeight(noise(ix*0.5,iy*0.5,millis()*0.0002)*80);
			point(x,y);
			print(ix+" "+iy);
		}
	}

}

