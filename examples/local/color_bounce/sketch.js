let a = "das ist eine variable die global ist";

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw() { // wird dauernd im loop aufgerufen
	var lokal = "blabla";
	let a = "hello";
 
	for (let a = 0; a<10;a++) {
		print(a);
	}
	print(a);
	makesomething();

}


function makesomething() {
}