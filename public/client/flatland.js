let _VERSION = "v0.01c";
let socket
let gui;
let flatlandlink;

var flatlandConfig = {
  server: "http://localhost:3000",
  land: 'default',
  debug: true,
  clearscreen: true,
  backgroundcolor: [0, 0, 0]
}

var machineConfig = {
  name: 'Hans',
  maxCount: 10,
  minSize: 10,
  maxSize: 100,
  lifetime: 10000,
  color1: [255, 255, 255],
  color1Opacity: 1,
  color2: [0, 0, 0],
  color2Opacity: 1

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  flatlandlink = new flatlandLink();
  initGui();
  initSocketIO();
}


function draw() {
  flatlandlink.clearScreen();
  flatlandlink.update();
  flatlandlink.drawDebugInformation();
}

class Machine extends defaultMachine {
  setup() {
    // initialize your machine
    this.type = MachineType.RECT;
    this.rotationspeed = random(-0.05, 0.05);
  }
  move() {
    // how does your machine move 
    this.rotation += this.rotationspeed;
    this.pos.x += random(-this.speed * 1, this.speed * 1);
    this.pos.y += random(-this.speed * 1, this.speed * 1);
    this.size = map(this.age(), 0, machineConfig.lifetime, machineConfig.maxSize, machineConfig.minSize);
  }
  draw() {
    // what is your machine drawing while moving
    // this.point(this.pos.x,this.pos.y);
  }
}


function initGui() {
  gui = new dat.GUI();

  let guiFlatlandFolder = gui.addFolder('flatlandConfig');
  guiFlatlandFolder.add(flatlandConfig, 'server');
  guiFlatlandFolder.add(flatlandConfig, 'debug');
  guiFlatlandFolder.addColor(flatlandConfig, 'backgroundcolor');
  guiFlatlandFolder.add(flatlandConfig, 'clearscreen');
  guiFlatlandFolder.open();

  let guiMachineFolder = gui.addFolder("machineConfig");

  guiMachineFolder.add(machineConfig, 'name');
  guiMachineFolder.add(machineConfig, 'maxCount', 1, 100);
  guiMachineFolder.add(machineConfig, "minSize", 1, 200);
  guiMachineFolder.add(machineConfig, "maxSize", 1, 200);
  guiMachineFolder.add(machineConfig, "lifetime", 1, 20000);
  guiMachineFolder.addColor(machineConfig, 'color1');
  guiMachineFolder.add(machineConfig, 'color1Opacity', 0, 1);
  guiMachineFolder.addColor(machineConfig, 'color2');
  guiMachineFolder.add(machineConfig, 'color2Opacity', 0.0, 1.0);
  guiMachineFolder.open();
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}