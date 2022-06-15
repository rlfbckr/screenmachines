let meineBlumen = [];
let max_flowers = 30;

let myFont;
function preload() { // laden der schrift
	myFont = loadFont('MyriadPro-Regular.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(myFont);
	textAlign(CENTER, CENTER);
	textSize(20);
	for (let i = 0; i < max_flowers; i++) { // erzeugen von xx bluemn objekten
		meineBlumen[i] = new Flower(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-500, 500), i);
	}

}

function draw() { // wird dauernd im loop aufgerufen
	background(255, 10);
	push();
	//scale(map(mouseY, 0, height, 0.01, 5)); // zoomen
	//rotateY(radians(map(mouseX, 0, width, -90, 90))); // drehen auf der Y achse
	for (let i = 0; i < max_flowers; i++) { // alle xx blumen zeichnen
		meineBlumen[i].zeichnen();
	}
	pop();
	 
	fill(0);
	text("fps = "+int(frameRate()), 0, 0, -100);
}

class Flower {
	constructor(_xpos, _ypos, _zpos, _id) {  // reglen für die erzeugungn der blumen!
		this.xpos = _xpos;
		this.ypos = _ypos;
		this.zpos = _zpos;
		this.id = _id;
		this.seed = random(100);
		this.dir = random(-1, 1);
		this.rotation = 0;
		this.color = color(random(255), random(255), random(255), 90);
	}

	zeichnen() {
		this.rotation = this.rotation + this.dir; // blume drehen!!
		randomSeed(this.seed);
		stroke(this.color);
		strokeWeight(7);
		for (var winkel = 0; winkel < 360; winkel = winkel + 10) {
			var radius = random(20, 160);
			var x = sin(radians(winkel + this.rotation)) * radius;
			var y = cos(radians(winkel + this.rotation)) * radius;
			line(this.xpos, this.ypos, this.zpos, this.xpos + x, this.ypos + y, this.zpos);
		}
		fill(0);
		//text("id=" + this.id, this.xpos, this.ypos, -100);

	}


}

