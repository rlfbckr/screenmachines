let balls = [];
let anzahl = 20; // wieviele bälle will ich erzeugen!!
let nid = 0;
let maxage = 10000;
let myFont;
let last_birth = 0;
let birth_interval = 600;
function preload() { // laden der schrift
	myFont = loadFont('MyriadPro-Regular.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	textFont(myFont);
	textAlign(CENTER, CENTER);
	textSize(20);
}

function draw() { // wird dauernd im loop aufgerufen
	background(0, 10);
	for (var key in balls) {
		balls[key].draw();
	}
	fill(255);
	text(balls.length, 0, 0);
	// neue bälle erzeugen
	if (balls.length < anzahl && (millis() - last_birth) > birth_interval) {
		balls.push(new Ball());
		last_birth = millis();

	}

	/*
	for (let j = 0; j < anzahl; j++) {
		for (let i = 0; i < anzahl; i++) {
			if (i != j) {
 
				if (dist(balls[j].xpos, balls[j].ypos, balls[i].xpos, balls[i].ypos) < 3) {
					//	noStroke();
					//ellipse(balls[j].xpos, balls[j].ypos, 200);
					balls[j].size = balls[j].size + 2; //  + balls[i].size)/2;
					balls[i].delete = true;
					//balls.splice(i,1);

				}
			}
		}
	}
	
	*/

	// alte bzw. tote bälle aus dem array löschen
	for (var key in balls) {
		if (balls[key].delete == true) {
			balls.splice(key, 1);
		}
	}
	fill(0);
	//text("fps = "+int(frameRate()), 0, 0, -100);
}

class Ball {
	constructor() {  // reglen für die erzeugungn der blumen!
		this.born = millis();
		this.xpos = random(-width / 2, width / 2);
		this.ypos = random(-height / 2, height / 2);
		this.xpos_target = random(-width / 2, width / 2);
		this.ypos_target = random(-height / 2, height / 2);

		this.delete = false;
		this.size = random(50, 100);
		this.color = color(255); // color(random(255), random(255), random(255), 90);
	}

	draw() {
		noStroke();
		var myage = millis() - this.born;
		//fill(this.color);
		fill(255, map(myage, 0, maxage, 255, 0));
		if (myage >= maxage) {
			this.delete = true; // mark for deleting
		}
		ellipse(this.xpos, this.ypos, this.size);
		let speed = 0.4; // bewegungsgeschindigkeite 0 = schnell / 1 = keine bewegung
		this.xpos = (this.xpos * speed) + (this.xpos_target * (1 - speed));
		this.ypos = (this.ypos * speed) + (this.ypos_target * (1 - speed));
		if (dist(this.xpos, this.ypos, this.xpos_target, this.ypos_target) < 2) { // wenn der taget wert erreicht is
			// neues zufälliges ziel erzeugen
			let jump = 5;
			let where = random(0, 360);
			this.xpos_target = constrain(this.xpos_target + (sin(radians(where)) * jump), -width / 2, width / 2);
			this.ypos_target = constrain(this.ypos_target + (cos(radians(where)) * jump), -height / 2, height / 2);

		}
		fill(255);
		//text(myage, this.xpos, this.ypos);


	}
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight, WEBGL);
}
