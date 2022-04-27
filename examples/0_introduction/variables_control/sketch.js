var anzahlDerLinien = 120;
var lineWeight = 2;
var wobble = 10;
var step = 0;
var showDebug = true;

function setup() {
	createCanvas(windowWidth, windowHeight); // width height
	//	print(width + " " + height);
	frameRate(40);
	textSize(50);
	textAlign(CENTER, CENTER);
	console.log("Hello!");
	if (navigator.requestMIDIAccess) {
		console.log('This browser supports WebMIDI!');
	} else {
		console.log('WebMIDI is not supported in this browser.');
	}
	navigator.requestMIDIAccess()
		.then(onMIDISuccess, onMIDIFailure);


}

function draw() {
	background(00);
	stroke(255);
	strokeWeight(lineWeight);

	// startwert; bis zu welchen wert;schrittlänge
	linienAbstand = height / anzahlDerLinien;
	for (var y = 0; y <= height; y = y + linienAbstand) {
		line(0, y + (step % wobble), width, y + (step % wobble));
	}
	step = step + 1;
	if (showDebug) {
		fill(255, 0, 0);
		noStroke();
		text("wobble=" + wobble + "\n" +
			"lineWeight=" + lineWeight + "\n" +
			"anzahlDerLinien=" + anzahlDerLinien, width / 2, height / 2);
	}
}
function keyTyped() {
	if (key === 'd') {
		showDebug=!showDebug;
	}

}


function onMIDISuccess(midiAccess) {

	WebMidi.enable(function (err) { //check if WebMidi.js is enabled
		if (err) {
			console.log("WebMidi could not be enabled.", err);
		} else {
			console.log("WebMidi enabled!");
		}

		console.log("---");
		console.log("Inputs Ports: ");


		for (i = 0; i < WebMidi.inputs.length; i++) {
			console.log(i + ": " + WebMidi.inputs[i].name);
		}

		console.log("---");
		console.log("Output Ports: ");
		for (i = 0; i < WebMidi.outputs.length; i++) {
			console.log(i + ": " + WebMidi.outputs[i].name);
		}
		input = WebMidi.inputs[1];
		// Listen to control change message on all channels
		input.addListener('controlchange', "all",
			function (e) {
				console.log("Received 'controlchange' message.", e);
				if (e.controller.number == 19) {
					anzahlDerLinien = int(map(e.data[2], 0, 127, 3, 200));
					console.log("hi");
				}
				if (e.controller.number == 18) {
					lineWeight = map(e.data[2], 0, 127, 0.5, 200.0);
				}
				if (e.controller.number == 17) {
					wobble = int(map(e.data[2], 0, 127, 1, 200));
				}

			}
		);
	});


}

function onMIDIFailure() {
	console.log('Could not access your MIDI devices.');
}

