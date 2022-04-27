var rand = 0;
var r_oben=0;
var g_oben=0;
var b_oben=0;
var r_unten=0;
var g_unten=0;
var b_unten=0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255);
	if (navigator.requestMIDIAccess) {
		console.log('This browser supports WebMIDI!');
	} else {
		console.log('WebMIDI is not supported in this browser.');
	}
	navigator.requestMIDIAccess()
		.then(onMIDISuccess, onMIDIFailure);
	
}

function draw() { // wird dauernd im loop aufgerufen
	strokeWeight(1);
	let from = color(r_oben, g_oben, b_oben);
	let to = color(r_unten, g_unten, b_unten);
	for (var y=rand;y<=windowHeight-rand;y=y+1) {
		//print(i);

		stroke(lerpColor(from, to, map(y,0,windowHeight,0.0,1.0)));
		line(rand,y,windowWidth-rand,y);	
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
					r_oben = int(map(e.data[2], 0, 127, 0, 255));
				}
				if (e.controller.number == 23) {
					g_oben = int(map(e.data[2], 0, 127, 0, 255));
				}
				if (e.controller.number == 27) {
					b_oben = int(map(e.data[2], 0, 127, 0, 255));
				}

				if (e.controller.number == 31) {
					r_unten = int(map(e.data[2], 0, 127, 0, 255));
				}
				if (e.controller.number == 49) {
					g_unten = int(map(e.data[2], 0, 127, 0, 255));
				}
				if (e.controller.number == 53) {
					b_unten = int(map(e.data[2], 0, 127, 0, 255));
				}

			}
		);
	});


}

function onMIDIFailure() {
	console.log('Could not access your MIDI devices.');
}

