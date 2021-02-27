const https = require('https');
var express = require('express');

var ip = require("ip");
console.dir ( ip.address() );

var app = express();
var server = app.listen(3000,'0.0.0.0');
app.use(express.static('public'));
console.log("Hello World!");