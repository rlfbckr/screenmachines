let socket
let gui;
let botmanager;

var flatlandConfig = {
  server: "http://localhost:3000",
  land: 'default'

}

var botconfig = {
  name: 'Hans',
  botcount: 10,
  minSize: 10,
  maxSize: 100,
  lifetime: 10000
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  botmanger = new botManager();
  initGui();
  initSocketIO();

}

function removeBot(data) {
  botmanger.removeBot(data);
}


function getRemoteBots(data) {
  botmanger.getRemoteBots(data);

}

function draw() {
  background(0);
  botmanger.update();
  fill(255);
  text("myid=" + socket.id + " | # bots = " + botmanger.botCountRemote(), 40, 40);
}


function initGui() {
  gui = new dat.GUI();
  let guiBotFolder = gui.addFolder("botConfig");
  guiBotFolder.add(botconfig, 'name');
  guiBotFolder.add(botconfig, 'botcount', 0, 100);
  guiBotFolder.add(botconfig, "minSize", 1, 200);
  guiBotFolder.add(botconfig, "maxSize", 1, 200);
  guiBotFolder.add(botconfig, "lifetime", 1, 20000);
  guiBotFolder.open();
}

function initSocketIO() {
  socket = io.connect(flatlandConfig.server);
  socket.on('botdata', getRemoteBots);
  socket.on('disbot', removeBot);
  console.log('socket.id = ' + socket.id);
}
