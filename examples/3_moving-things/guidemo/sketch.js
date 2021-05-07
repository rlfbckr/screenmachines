
var step = 0;
var parametersDAT = {
	linien: 100,
	debug: true,
	backgroundcolor: [0, 0, 0],
	strokecolor: [255, 255, 255]
}
function setup() {

	createCanvas(windowWidth, windowHeight); // width height
	//	print(width + " " + height);

	frameRate(40);
	textSize(100);
	textAlign(CENTER, CENTER);
	gui = new dat.GUI();

	let guiFolder = gui.addFolder('paramters');
	guiFolder.add(parametersDAT, 'linien', 1, 100);
	guiFolder.add(parametersDAT, 'debug');
	guiFolder.addColor(parametersDAT, 'backgroundcolor');
	guiFolder.addColor(parametersDAT, 'strokecolor');
	guiFolder.open();
}

function draw() {
	linienAbstand = height / parametersDAT.linien;
	background(parametersDAT.backgroundcolor[0], parametersDAT.backgroundcolor[1], parametersDAT.backgroundcolor[2]);
	stroke(parametersDAT.strokecolor[0], parametersDAT.strokecolor[1], parametersDAT.strokecolor[2]);
	strokeWeight(4);
	for (var y = 0; y <= height; y = y + linienAbstand) {
		line(0, y + (step % 5), width, y + (step % 5));
	}
	step = step + 1;
	if (parametersDAT.debug == true) {
		fill(255, 0, 0);
		text("dat.guidemo\nstep=" + step + "\nstep%5=" + (step % 5), width / 2, height / 2);
	}
}




