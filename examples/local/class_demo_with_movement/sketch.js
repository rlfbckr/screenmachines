let balls = [];
let anzahl = 100; // wieviele bälle will ich erzeugen!!

let myFont;
function preload() { // laden der schrift
	myFont = loadFont('MyriadPro-Regular.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(myFont);
	textAlign(CENTER, CENTER);
	textSize(20);
	for (let i = 0; i < anzahl; i++) { // erzeugen von xx bluemn objekten
		balls[i] = new Ball(i);
	}

}

function draw() { // wird dauernd im loop aufgerufen
	background(0, 10);
	for (let i = 0; i < anzahl; i++) { // alle xx blumen zeichnen
		balls[i].draw();
	}
	fill(0);
	//text("fps = "+int(frameRate()), 0, 0, -100);
}

class Ball {
	constructor(_id) {  // reglen für die erzeugungn der blumen!
		this.xpos = random(-width / 2, width / 2);
		this.ypos = random(-height / 2, height / 2);
		this.xpos_target = random(-width / 2, width / 2);
		this.ypos_target = random(-height / 2, height / 2);
		this.id = _id;
		this.size =  random(1,10);
		this.color = color(255); // color(random(255), random(255), random(255), 90);
	}

	draw() {
		noStroke();
		fill(this.color);
		ellipse(this.xpos,this.ypos,this.size);
		let speed = 0.9; // bewegungsgeschindigkeite 0 = schnell / 1 = keine bewegung
		this.xpos = (this.xpos *speed) + (this.xpos_target *(1-speed));
		this.ypos = (this.ypos *speed) + (this.ypos_target *(1-speed));
		if (dist(this.xpos,this.ypos,this.xpos_target,this.ypos_target) < 2) { // wenn der taget wert erreicht is
			// neues zufälliges ziel erzeugen
			this.xpos_target =constrain(this.xpos_target+ random(-100,100),-width/2,width/2); 
			this.ypos_target = constrain(this.ypos_target+ random(-100,100),-height/2,height/2); 
		}
		

	}
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight,WEBGL);
}
