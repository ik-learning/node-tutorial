var express = require('express');
var neo4j = require('node-neo4j');

var app = express();
var db = new neo4j('http://172.16.11.5:7474');


app.listen(3000, function () {
    console.log('started');
});

app.post('/upload', function () {

});

app.get('/load', function (req, res, next) {
    db.insertNode({
        name: 'Darth Vader #' + parseInt(Math.random() * 100),
        sex: 'male'
    }, ['Person'], function (err, node) {
        if (err) return next(err);

        res.json(node);
    });
});