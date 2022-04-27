var xpos_last;
var ypos_last;
var xpos;
var ypos;
var step = 40;

function setup() {
	createCanvas(windowWidth, windowHeight);
	xpos = windowWidth / 2;
	ypos = windowHeight / 2;
	background(0);

}

function draw() { // wird dauernd im loop aufgerufen
	background(0, 2);
	stroke(0,255,0);
	strokeWeight(3);
	//	point(xpos,ypos);
	xpos_last = xpos;
	ypos_last = ypos;

	xpos = xpos + (int(random(-2, 2)) * step);
	ypos = ypos + (int(random(-2, 2)) * step);
	line(xpos_last, ypos_last, xpos, ypos);
	if (xpos < 0 || xpos > windowWidth) {
		xpos = xpos_last;
	}
	if (ypos < 0 || ypos > windowWidth) {
		ypos = ypos_last;
	}
}

