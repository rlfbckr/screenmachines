var hintergrund_farbe = 0;
var fade_direction = +1;

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() { // wird dauernd im loop aufgerufen
	background(hintergrund_farbe);
	hintergrund_farbe=hintergrund_farbe+fade_direction;
	if (hintergrund_farbe >= 255) {
		fade_direction = -1;
	}
	if (hintergrund_farbe <=0) {
		fade_direction = 1;
	}
}