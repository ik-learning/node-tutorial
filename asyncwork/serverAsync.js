var http = require('http');
var fs = require('fs');
// add winston logging

http.createServer(function (req, res) {
    if (req.url = '/') {
        fs.readFile('data1.json', function (err, info) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Server Error Happens!');
            } else {
                res.end(info);
            }
        });
    }
}).listen(3000);