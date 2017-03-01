'use strict';

var request = require('request');
var properties = require('./../etc/properties-hidden');
var exports = module.exports = {};

const TIMEOUT_CALL = 90000;

exports.get = function (protocol, host, path, query, callback) {
    var url = protocol + "://" + host + path + query;
    console.info('sending GET request to url: ' + url);
    request({
        url: url,
        method: "GET",
        timeout: TIMEOUT_CALL
    }, callback);
};
