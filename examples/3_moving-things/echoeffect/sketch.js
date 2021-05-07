
function setup() {
	createCanvas(windowWidth, windowHeight); // width height
	rectMode(CENTER);
	frameRate(50);
	// Rot, Grün, Blau , Transparnt
	background(255, 0, 0,255);
}

function draw() {
	//	background(0); // leere den bildschim und füll in 0;
	background(255, 0, 0,50);
	noFill();
	strokeWeight(10);
	stroke(255,255,255);
	push();
	translate(width / 2, height / 2);
	rotate(millis() * 0.0005);
	rect(0, 0, 300, 300);
	pop();
}




