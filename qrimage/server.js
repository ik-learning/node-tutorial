'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var health = require('./lib/routes/health');

var app = express();
app.use(bodyParser.json());

var server = app.listen(8081, function () {
   console.log('Node.js Server Running');
   var host = server.address().address;
   var port = server.address().port;
   console.log('listening http://%s:%s', host, port)
});

app.get('/health', function (req, res) {
    health.route(req, res);
});

// create gr image endpoint


