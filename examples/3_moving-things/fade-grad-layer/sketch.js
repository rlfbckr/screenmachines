let xposition = 500;
let xposition_target = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	textSize(20);
	//frameRate(1);
	xposition_target = random(0,windowWidth);
}

function draw() { // wird dauernd im loop aufgerufen
	//background(255); // der hintergrund wird auf weiss gesetzt
	for (let xx = xposition;xx < windowWidth;xx++) {
		stroke(map(xx,0,windowWidth,255,0));
		line(xx,0,xx,windowHeight);

	}
	for (let xx = xposition;xx > 0;xx--) {
		stroke(map(xx,0,windowWidth,0,255));
		line(xx,0,xx,windowHeight);

	}

	// fade bzw. annäherungsfunktion ??
	//geschwindigkeit wird durch 0.9 bzw. 0.1 angeben
	let speed = 0.99;
	xposition = (xposition*speed) + (xposition_target*(1-speed)); 

	if (abs(xposition-xposition_target)<2) { // ist target erreicht
		xposition_target = random(0,windowWidth);
	}
	noStroke();
	fill(255);
	text("xposition=" + int(xposition), 40, 100);
	text("xposition_target=" + int(xposition_target), 40, 130);
}

class layer {
let xposition = 0;
let xpos_target = 0;
	constructor() {

	}

	draw() {


	}
}