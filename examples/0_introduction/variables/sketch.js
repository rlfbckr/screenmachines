var anzahlDerLinien = 50;
var step = 0;

function setup() {
	createCanvas(windowWidth, windowHeight); // width height
	//	print(width + " " + height);
	linienAbstand = height / anzahlDerLinien;
	frameRate(40);
	textSize(100);
	textAlign(CENTER, CENTER);
}

function draw() {
	background(00);
	stroke(255);
	strokeWeight(4);
	// startwert; bis zu welchen wert;schrittlänge
	for (var y = 0; y <= height; y = y + linienAbstand) {
		line(0, y+(step%5), width, y+(step%5));
	}
//	step=step+1;
//	fill(255,0,0);
//	text("step="+step+"\nstep%5="+(step%5),width/2,height/2);
}




