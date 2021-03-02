const https = require('https');
var express = require('express');
var ip = require("ip");
console.log("Hello World!");
console.log("serverip: " + ip.address());

var app = express();
var server = app.listen(3000, '0.0.0.0');
app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection ' + socket.id);
    socket.on('disconnet', disconnect);

    socket.on('machine', machineMessage);
    socket.on('removemachine', removeMachine);
    //   console.log(socket);
    function disconnect() {
        socket.broadcast.emit("removeclient", { id: socket.id });
    }
    function machineMessage(data) {
      //  console.log(data);
        socket.broadcast.emit("updateremotemachines", data);
    }

    function removeMachine(data) {
        console.log("removemachine: " + data.machineid);
        socket.broadcast.emit("removemachine", data);
    }

}
