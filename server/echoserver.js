// http://localhost/echo?message=Hello -> Hello

var http = require('http');
var url = require('url');

var server = new http.Server(function (req, res) {


    console.log(req.method, req.url);
    // parse true
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.statusCode = 200;
        res.setHeader('Cache-control', 'no-cache, no-store, revalidate');
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404;
        res.end('Page not found')
    }

});

server.listen(1377, '127.0.0.1');