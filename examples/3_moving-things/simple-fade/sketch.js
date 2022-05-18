let xposition = 500;
let xposition_target = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	textSize(40);
	//frameRate(1);
	xposition_target = random(0,windowWidth);
}

function draw() { // wird dauernd im loop aufgerufen
	background(255); // der hintergrund wird auf weiss gesetzt
	stroke(0);
	text("xposition=" + xposition, 40, 100);
	text("xposition_target=" + xposition_target, 40, 130);
	line(xposition,0,xposition,windowHeight);
	// fade bzw. annäherungsfunktion ??
	//geschwindigkeit wird durch 0.9 bzw. 0.1 angeben
	let speed = 0.9;
	xposition = (xposition*speed) + (xposition_target*(1-speed)); 

	if (abs(xposition-xposition_target)<2) { // ist target erreicht
		xposition_target = random(0,windowWidth);
	}
}


