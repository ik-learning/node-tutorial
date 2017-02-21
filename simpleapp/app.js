var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.set('port', 3000);
//app.set('env', 'development');

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

app.use(function (req, res, next) {
    if (req.url == '/forbidden') {
        next(new Error('woops, denied'))
    } else {
        res.header("Content-Type", "application/json");
        res.status(404).send({error: 'API NOT FOUND'});
    }
});


/**
 * Error handler
 */
app.use(function (error, req, res, next) {
    if (app.get('env') == 'development') {
        console.log('development error handler not set')
    }
    res.status(500).send({error: 'Service Unavailable'})
});

app.get('/shutdown', function (req, res) {
    console.warn('Shutdown Server');
    if (server) server.close();

    setTimeout(function () {
        process.exit(1);
    }, 1000).unref();
});