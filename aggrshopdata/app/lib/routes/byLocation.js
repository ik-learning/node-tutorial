'use strict';
var callout = require('../utils/callout');
var secProp = require('./../etc/properties-hidden');
var prop = require('./../etc/properties');

var exports = module.exports = {};

var fs = require('fs');

exports.routeTest = function (req, res) {
    res.header("Content-Type", "application/json");
    var callBack = function (error, response, body) {
        if (error) {
            res.end(JSON.stringify(error));
        } else {
            var data = JSON.parse(body);
            fs.writeFileSync('./lib/staticdata/all.json', JSON.stringify(data, null, 4));
            res.status(response.statusCode).end('Succeed. Successfuly retreived ' + data.length + ' shops.');
        }
    };

    callout.get(secProp.ByLocation.Protocol, secProp.ByLocation.Host, secProp.ByLocation.Path, secProp.ByLocation.Query, callBack);
};

exports.routeWeb = function (req, res) {
    res.header("Content-Type", "application/json");
    var callBack = function (error, response, body) {
        if (error) {
            res.end(JSON.stringify(error));
        } else {
            var array = [];
            var data = JSON.parse(body);
            for (var obj in data) {
                array.push(data[obj]['shopId']);
            }
            //fs.writeFileSync('./lib/staticdata/ids.json', JSON.stringify(array, null, 4));
            //fs.writeFileSync('./lib/staticdata/allWeb.json', JSON.stringify(data, null, 4));
            res.status(response.statusCode).end('Succeed. Successfuly retreived ' + data.length + ' shops.');
        }
    };

    callout.get(prop.ByLocation.Protocol, prop.ByLocation.Host, prop.ByLocation.Path, prop.ByLocation.Query, callBack);
};
