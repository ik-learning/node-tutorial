'user strict';

var express = require('express');
var bodyParser = require("body-parser");
var byLocation = require('./lib/routes/byLocation');
var byId = require('./lib/routes/byId');
// create external service.
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

var server = app.listen(8081, function () {
    console.log('node.js server app');
    var host = server.address().address;
    var port = server.address().port;
    console.log("shop parser listening at http://%s:%s", host, port)
});

app.get('/all', function (req, res) {
    //byLocation.routeTest(req, res);
    byLocation.routeWeb(req, res);
});

app.get('/ids', function (req, res) {
    byId.routeWeb(req, res);
});

app.get('/test', function (req, res) {
    var data = {};
    data.table = [];

    data.table.push({ key: "2342151235"});
    data.table.push({ acount: "locked"});
    data.table.push({
        "address": {
            "street": "3/5 Dudley Avenue,",
            "postCode": "WF17 0JY",
            "city": "Batley",
            "telephone": "3313 001 001"
        },
        "dist": 841,
        "description": "TEST PARCELSHOP 2514",
        "shopOwner": "",
        "parcelShopNumber": 1992,
        "businessHours": [
            {
                "dayOfWeek": "Sun",
                "openFrom": "07:00",
                "openTill": "20:00"
            },
            {
                "dayOfWeek": "Mon",
                "openFrom": "07:00",
                "openTill": "20:00"
            },
            {
                "dayOfWeek": "Tue",
                "openFrom": "07:00",
                "openTill": "20:00"
            },
            {
                "dayOfWeek": "Wed",
                "openFrom": "07:00",
                "openTill": "20:00"
            },
            {
                "dayOfWeek": "Thu",
                "openFrom": "07:00",
                "openTill": "20:00"
            },
            {
                "dayOfWeek": "Fri",
                "openFrom": "07:00",
                "openTill": "20:00"
            },
            {
                "dayOfWeek": "Sat",
                "openFrom": "07:00",
                "openTill": "20:00"
            }
        ],
        "acceptsSuitcases": false,
        "sellsBoxes": false,
        "lat": 53.734993,
        "lng": -1.646018,
        "externalId": "S01992",
        "salesforceID": "S01992",
        "typeID": 0
    });

    fs.writeFileSync('./lib/staticdata/all.json', JSON.stringify(data.table, null, 4));
    res.end('Job Done\n');
});