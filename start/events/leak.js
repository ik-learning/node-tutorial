// Memory leak in this js
var EventEmitter = require('events').EventEmitter;

var db = new EventEmitter();

function Request() {
    var self = this;
    this.bigData = new Array(1e6).join('*');

    this.send = function (data) {
        console.log(data);
    };

    this.onError = function () {
      self.send('sorry, service unavailable')
    };

    function onData(info) {
        self.send(info);
    }

    this.end = function () {
      db.removeListener('data', onData)
    };

    db.on('data', onData);
}

setInterval(function () {
    var request = new Request();
    request.end();
    console.log(process.memoryUsage().heapUsed);
}, 200);
