var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.set('port', 3000);

var server = http.createServer(app).listen(app.get('port'), function () {
    var host = server.address().address;
    var port = app.get('port');
    console.log('Express server listening on http://%s:%s', host, port);
});

// Middleware
app.get('/test', function (req, res, next) {
    res.end('Hello from Express\n');
});

app.get('/health', function (req, res) {
    res.end('Health endpoint\n');
});

app.get('/shutdown', function (req, res) {
    console.warn('Shutdown Server');
    if (server) server.close();

    setTimeout(function () {
        process.exit(1);
    }, 1000).unref();
});