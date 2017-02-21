'use strict';

var domain = require('domain');

const serverDomain = domain.create();
var server;

serverDomain.on('error', function (err) {
    console.error("Domain intercept %s", err);
    if (server) server.close();

    setTimeout(function () {
        process.exit(1);
    }, 1000).unref();
});

serverDomain.run(function () {
    // attach server to domain
    server = require('./server');
    server.listen(3000);
});

