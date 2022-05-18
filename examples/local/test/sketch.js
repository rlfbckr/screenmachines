
function setup() {
	createCanvas(windowWidth, windowHeight);
	textSize(100);
}

function draw() { // wird dauernd im loop aufgerufen
	background(map(mouseX, 0, windowWidth, 255, 0));
	stroke(255);
	text(mouseX + " = " + int(map(mouseX, 0, windowWidth, 0, 255)), 50, 150);

	let line_start_x = windowWidth / 2;
	let line_start_y = windowHeight / 2;

	let line_stop_x = mouseX;
	let line_stop_y = mouseY;
	//let mitte_x = (line_start_x+line_stop_x)*0.2;
	//let mitte_y = (line_start_y+line_stop_y)*0.2;
	for (let i = 0; i <= 9; i =i + 1) {
		let mitte_x = lerp(line_start_x, line_stop_x, i/9);
		let mitte_y = lerp(line_start_y, line_stop_y, i/9);
		stroke(0, 255, 255);
		ellipse(mitte_x, mitte_y, 10, 10);
	}
	stroke(255, 0, 255);
	line(line_start_x, line_start_y, line_stop_x, line_stop_y);

}

