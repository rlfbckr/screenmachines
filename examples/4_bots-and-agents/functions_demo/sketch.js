var rotation = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);

}

function draw() { // wird dauernd im loop aufgerufen
	background(0, 0, 255);
	for (y = 0; y < 5; y++) {
		for (x = 0; x < 5; x++) {
			drawFlower(map(x,0,4,150,width-150), map(y,0,4,150,height-150), x+y*10);

		}
	}
	rotation=rotation-2;
}


function drawFlower(xpos, ypos, seed) {
randomSeed(seed);
	stroke(255, 150);
	strokeWeight(7);

	for (var winkel = 0; winkel < 360; winkel = winkel + 20) {
		var radius = random(20, 80);
		var x = sin(radians(winkel+rotation)) * radius;
		var y = cos(radians(winkel+rotation)) * radius;
		line(xpos, ypos, xpos + x, ypos + y);
	}
}