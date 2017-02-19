// demo how to work with events
// arguments passed in chain
var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter;

// consumers consume in order which they defined
server.on('request', function (request) {
    request.approved = true;
});
server.on('request', function (request) {
   console.log(request);
});

server.on('error', function (error) {
   console.log('Error catched %s', error.message)
});

server.emit('request', {from: 'Client'});
server.emit('error', new Error('Server Error'));
server.emit('request', {from: 'Another Client'});

