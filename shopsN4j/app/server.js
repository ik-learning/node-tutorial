var express = require('express');
var neo4j = require('node-neo4j');

var app = express();

var db = new neo4j('http://172.16.11.5:7474');
var NodeGeocoder = require('node-geocoder');




app.listen(3000, function () {
    console.log('started');
});

app.post('/upload', function () {

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
        .then(function(res) {
            console.log(res);
            var lat = res[0].latitude;
            var long = res[0].longitude;
            var cipher = "CALL spatial.withinDistance('geom',{lon:" + long + ", lat:" + lat+"}, "+ dist+")";

            db.cypherQuery(cipher, function (err, result) {
                if(err) throw err;

                console.log(result.data); // delivers an array of query results
                console.log(result.columns); // delivers an array of names of objects getting returned
                response.json(result.data)
            });
        })
        .catch(function(err) {
            console.log(err);
            res.statusCode(400).json({ error: 'Something Happen'})
        });

});

var data = require('./resources/allWeb.json');

app.get('/upload', function (req, res, next) {

    // pass post code
    var headers = {
        'Content-Type': 'application/json'
    };
    var counter = 0;
    for (var i in data) {
        var shop = data[i];
        db.insertNode({
            id: shop.shopId,
            description: shop.description,
            lat: shop.lat,
            lon: shop.lng
            //,
            // address: {
            //     street: shop.address.street,
            //     postCode: shop.address.postCode,
            //     city: shop.address.city
            // }
        }, ['Shop'], function (err, node) {
            if (err) return next(err);
            addToPointLayer(node._id, headers);
            counter += 1
        });
    }
    res.end('Updated ' + counter);
});

function addToGeomIndex(id, headers) {


}

function addToPointLayer(id, headers) {
    var url = 'http://172.16.11.5:7474/db/data/ext/SpatialPlugin/graphdb/addNodeToLayer';
    var nodeLocation = "http://localhost:7575/db/data/node/" + id;
    var data = {layer: "geom", node: nodeLocation};
    request.post({url: url, form: data, headers: headers}, function (error, request, body) {
        if (error) console.log(error);
        console.log(body);
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

    // DEPRECATED in version 3.0.2
    // var url = 'http://172.16.11.5:7474/db/data/index/node/';
    //
    // var data = {name: "geom", config: {provider: "spatial", geometry_type: "point", lat: "lat", lon: "lon"}};
    // request.post({url: url, form: data, headers: headers}, function (error, request, body) {
    //     if (error) console.log(error);
    //     console.log(body);
    // });


});

/*
 {"name":"geom","config":{"provider":"spatial","geometry_type":"point","lat":"lat","lon":"lon"}}' --header "Content-Type:application/json" http://localhost:7474/db/data/index/node/


 */









/*
 var options = {
 hostname: '172.16.11.5',
 port: 7474,
 path: '/db/data/ext/SpatialPlugin/graphdb/addSimplePointLayer',
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 }
 };
 var req = http.request(options, function(res) {
 console.log('Status: ' + res.statusCode);
 console.log('Headers: ' + JSON.stringify(res.headers));
 res.setEncoding('utf8');
 res.on('data', function (body) {
 console.log('Body: ' + body);
 });
 });
 req.on('error', function(e) {
 console.log('problem with request: ' + e.message);
 });
 req.write("{\"layer\":\"geom\",\"lat\":\"lat\",\"lon\":\"lon\"}");
 req.end();

 */