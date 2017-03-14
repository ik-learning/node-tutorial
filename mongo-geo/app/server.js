var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
var async = require('async');
var location = require('./location')();
var Location = mongoose.model('Location');
var controllers = require('./controllers');
var bodyParser = require("body-parser");

var fs = require('fs');
var path = require('path');

// Bootstrap mongoose and load dummy data
mongoose.connect('mongodb://test:test@172.16.11.5:27017/locations', function (err) {
    if (err) {
        console.log('No connection');
        throw err;
    }
    console.log('Connected to DB');

    // load data from file and transform it to Object
    var data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

    // clean db and load new data
    Location.remove(function () {
        async.each(data, function (item, callback) {
            // create a new location
            Location.create(item, callback);
        }, function (err) {
            if (err) {
                console.log('---------------ERROR-------------');
                throw err;
            }
        });
    });

});

// Configure Express

app.use(bodyParser.json());

app.get('/', controllers.index);
app.get('/api/locations', controllers.findLocation);

// Start the server
server.listen(3002, function () {
    console.log("Express server up and running on port 3000 - simple geolocation");
});