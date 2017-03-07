var express = require('express');
var neo4j = require('node-neo4j');

var app = express();

var db = new neo4j('http://172.16.11.5:7474');
var NodeGeocoder = require('node-geocoder');


app.listen(8089, function () {
    console.log('started');
});


var http = require("http");
var request = require('request');
var options = {
    provider: 'google',
    httpAdapter: 'https',
    formatter: null
};
var geocoder = NodeGeocoder(options);

app.get('/find', function (req, res, next) {
    // promise
    var response = res;
    var query = req.query.findquery;
    var dist = req.query.dist;
    console.log(query + ":" + dist);
    geocoder.geocode({address: query, coutryCode: 'GB'})
        .then(function (res) {
            console.log(res);
            var lat = res[0].latitude;
            var long = res[0].longitude;
            var cipher = "CALL spatial.withinDistance('geom',{lon:" + long + ", lat:" + lat + "}, " + dist + ")";

            db.cypherQuery(cipher, function (err, result) {
                if (err) throw err;

                console.log(result.data); // delivers an array of query results
                console.log(result.columns); // delivers an array of names of objects getting returned
                response.json(result.data)
            });
        })
        .catch(function (err) {
            console.log(err);
            res.statusCode(400).json({error: 'Something Happen'})
        });

});

app.get('/facilities', function (req, res, next) {
    var data = ['acceptsSuitcases', 'hasBoxes', 'ident', 'parkingAvailable', 'atmAvailable',
        'billPaymentAvailable', 'lotteryAvailable', 'sevenDayOpening', 'offLicense', 'tobaccoSales', 'cardPaymentAvailable'];
    for (var i in data) {
        var facility = data[i];
        db.insertNode({
            name: facility
        }, ['Facility'], function (err, node) {
            if (err) return next(err);
            facilitites[facility] = node._id;
        });
    }
    res.end('Setup facilities');
});

var data = require('./resources/merged.json');
app.get('/upload', function (req, res, next) {
    // pass post code
    var headers = {
        'Content-Type': 'application/json'
    };
    var facilitiesD = ['acceptsSuitcases', 'hasBoxes', 'ident', 'parkingAvailable', 'atmAvailable',
        'billPaymentAvailable', 'lotteryAvailable', 'sevenDayOpening', 'offLicense', 'tobaccoSales', 'cardPaymentAvailable'];

    var counter = 0;
    for (var i in data) {
        var shop = data[i];
        db.insertNode({
            id: shop.shopId,
            description: shop.description,
            lat: shop.lat,
            lon: shop.lng
        }, ['Shop'], function (err, node) {
            if (err) return next(err);
            addToPointLayer(node._id, headers);
            for (var sf in shop.facilities) {
                switch (shop.facilities[sf]) {
                    case 'acceptsSuitcases':
                        db.insertRelationship(node._id, 2, 'HAS', {title: 'suite case'});
                        break;
                    case 'hasBoxes':
                        db.insertRelationship(node._id, 1, 'HAS', {title: 'boxes'});
                        break;
                    case 'ident':
                        db.insertRelationship(node._id, 6, 'HAS', {title: 'ident'});
                        break;
                    case 'parkingAvailable':
                        db.insertRelationship(node._id, 3, 'HAS', {title: 'parking'});
                        break;
                    case 'atmAvailable':
                        db.insertRelationship(node._id, 7, 'HAS', {title: 'atm'});
                        break;
                    case 'billPaymentAvailable':
                        db.insertRelationship(node._id, 0, 'HAS', {title: 'pay bill'});
                        break;
                    case 'lotteryAvailable':
                        db.insertRelationship(node._id, 5, 'HAS', {title: 'lottery'});
                        break;
                    case 'sevenDayOpening':
                        db.insertRelationship(node._id, 4, 'HAS', {title: '7 days'});
                        break;
                    case 'offLicense':
                        db.insertRelationship(node._id, 9, 'HAS', {title: 'off licence'});
                        break;
                    case 'tobaccoSales':
                        db.insertRelationship(node._id, 8, 'HAS', {title: 'tobacco'});
                        break;
                    case 'cardPaymentAvailable':
                        db.insertRelationship(node._id, 10, 'HAS', {title: 'card payment'});
                        break;

                }
            }
            counter += 1;
        });
    }
    res.end('Updated ' + counter);
});


function addToPointLayer(id, headers) {
    var url = 'http://172.16.11.5:7474/db/data/ext/SpatialPlugin/graphdb/addNodeToLayer';
    var nodeLocation = "http://172.16.11.5:7474/db/data/node/" + id;
    var data = {layer: "geom", node: nodeLocation};
    request.post({url: url, form: data, headers: headers}, function (error, request, body) {
        if (error) console.log(error);
        // console.log(body);
    });

}

app.get('/setup', function (req, res, next) {
    var url = 'http://172.16.11.5:7474/db/data/ext/SpatialPlugin/graphdb/addSimplePointLayer';
    var headers = {
        'Content-Type': 'application/json'
    };
    var data = {layer: "geom", lat: "lat", lon: "lon"};
    request.post({url: url, form: data, headers: headers}, function (error, request, body) {
        if (error) console.log(error);
        console.log(body);
    });
    res.end('Set GEO layer');
});







