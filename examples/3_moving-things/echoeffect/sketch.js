
function setup() {
	createCanvas(700, 700); // width height
	rectMode(CENTER);
	frameRate(50);
	// Rot, Grün, Blau , Transparnt
	background(255);
	noFill();
	strokeWeight(1);
	noStroke();
 	//blendMode(LIGHTEST);
	 // https://p5js.org/reference/#/p5/blendMode

}

function draw() {
	//clear();
	background(255,10);
	fill(0,255,0);
	push();
	translate(200, height / 2);
	rotate(millis() * 0.0005);
	rect(0, 0, 300, 300);
	pop();

	fill(0, 0, 255,23);
	push();
	translate(500, height / 2);
	rotate(millis() * -0.005);
	rect(0, 0, 300, 300);
	pop();

}




