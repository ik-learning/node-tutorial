'use strict';
var callout = require('../utils/callout');
var secProp = require('./../etc/properties-hidden');
var prop = require('./../etc/properties');
var ids = require('../staticdata/ids.json');

var exports = module.exports = {};

var fs = require('fs');

exports.routeWeb = function (req, res) {
    res.header("Content-Type", "application/json");
    var data = {};
    data.table = [];
    fs.appendFileSync('./lib/staticdata/byId.json', '[');
    var callBack = function (error, response, body) {
        if (error) {
            res.end(JSON.stringify(error));
        } else {
            //data.table.push(JSON.parse(body));
            fs.appendFileSync('./lib/staticdata/byId.json', JSON.stringify(JSON.parse(body), null, 4) + ',');
        }
    };


    for (var i in ids) {
        callout.get(prop.ById.Protocol, prop.ById.Host, prop.ById.Path, prop.ById.Query + ids[i], callBack);
        console.log(ids[i] + ' Is Processed')
    }
    // console.log('Counter ' + counter);
    //     fs.writeFileSync('./lib/staticdata/byId.json', JSON.stringify(data.table, null, 4));
        res.end('Job Done ' + data.table.length + ' objects processed.');

};