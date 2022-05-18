function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() { // wird dauernd im loop aufgerufen
	background(0);
	strokeWeight(2);
	stroke(255);
	for (var y = 0; y < windowHeight; y = y + 30) {
		for (var x = 0; x < windowWidth; x = x + 10) {
			//		point(x,(windowHeight/2)+random(-200,200));
			point(x, y+ (windowHeight / 2) + (noise(y,x * map(mouseY, 0, windowHeight, 0.5, 0.00001), millis() * 0.0001) * 500) - 250-500);

		}
	}
}

