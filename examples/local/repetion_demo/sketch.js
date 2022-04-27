var rand = 150;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	noLoop();
}

function draw() { // wird dauernd im loop aufgerufen
	strokeWeight(1);
	for (var y=rand;y<=windowHeight-rand;y=y+1) {
		//print(i);
		stroke(
			map(y,rand,windowHeight-rand,0,255),
			map(y,rand,windowHeight-rand,255,0),
			map(y,rand,windowHeight-rand,0,127)
		);
		line(rand,y,windowWidth-rand,y);	
	}
}