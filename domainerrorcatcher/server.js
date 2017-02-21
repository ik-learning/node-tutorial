'use strict';
var http = require('http');
var redis = require('redis').createClient();

console.info('START APP SERVER');

function handler(req, res) {
    if (req.url == '/test') {
        var content;
        try {
          content =  JSON.parse('invalid!');
        } catch(err) {
            console.log('--> re-throw an error');
            throw err;
        }
        res.end(content);
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }

    redis.get('data', process.domain.bind(function (err, data) {
        throw new Error('redis callback');
    }));
}

var server = new http.createServer(handler);
module.exports = server;