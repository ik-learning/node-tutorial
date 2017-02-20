var http = require('http');
//var debug = require('debug')('server');
var fs = require('fs');

var server = new http.Server();

server.listen(1377, '127.0.0.1');

var counter = 0;
var emit = server.emit;
server.emit = function (event /*, arg1, arg2, ..*/) {
   console.log(event);
   emit.apply(server, arguments);
   fs.readFile()
};

server.on('request', function (req, res) {
    res.end('Hello, world!\n ' + ++counter + "\n");
});


