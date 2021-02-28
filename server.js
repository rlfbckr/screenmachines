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
    socket.on('disconnet', dis);
    socket.on('mouse', mouseMessage);
    socket.on('bot', botMessage);
    //   console.log(socket);
function dis() {
    socket.broadcast.emit("disbot", { id: socket.id } );
}
    function botMessage(data) {
        console.log(data);
        socket.broadcast.emit("botdata", data);
        //        console.log("bot");
        //  console.log(data);

    }


    function mouseMessage(data) {
        console.log("mouse");
        //   socket.broadcast.emit("mouse", data);
        console.log(data);

    }
}
