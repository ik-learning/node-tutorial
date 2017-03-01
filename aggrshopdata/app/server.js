var express = require('express');
var bodyParser = require("body-parser");
// create external service.
var fs = require('fs');
var util = require('util');

var app = express();
app.use(bodyParser.json());

var server = app.listen(8081, function () {
    console.log('node.js server app');
    var host = server.address().address;
    var port = server.address().port;
    console.log("shop parser listening at http://%s:%s", host, port)
});

app.get('/all', function (req, res) {
    fs.writeFile('./lib/staticdata/all.json', Json.stringify({ "data" : "passed"}, null, 2), function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
    res.end('Job Done');
});