var http = require('http');
var fs = require('fs');

var ids = require('./resources/ids');
var info = require('./resources/allWeb');
var extraInfo = require('./resources/byId');

var server = http.createServer(function (request, response) {
    var structure = [];
    for (var i in ids) {
        var id = ids[i];
        var data = {};
        var extData = {};
        for (var z in info) {
            if (info[z].shopId == id)
                data = info[z];
        }
        for (var d in extraInfo) {
            if (extraInfo[d].shopId == id)
                extData = extraInfo[d];
        }
        var combination = {
            "shopId": data.shopId,
            "lat": data.lat,
            "lng": data.lng,
            "description": data.description,
            "address": data.address,
            "businessHours": extData.businessHours,
            "facilities": defineFacilities(extData)
        };
        structure.push(combination);
    }
    fs.writeFileSync('./resources/merged.json', JSON.stringify(structure, null, 4));
    response.end('Job Done\n');
});

server.listen(3001);
console.log("Server is listening");

function defineFacilities(value) {
    // 32281
    var data = ['acceptsSuitcases', 'hasBoxes', 'ident', 'parkingAvailable', 'atmAvailable',
        'billPaymentAvailable', 'lotteryAvailable', 'sevenDayOpening', 'offLicense', 'tobaccoSales', 'cardPaymentAvailable'];
    var result = [];
    for (var i in data) {
        var prop = data[i];
        if (value.hasOwnProperty(prop)) {
            var exp = value[prop];
            logging(prop, exp, value.shopId);
            if (exp) {
                result.push(prop);
            }
        }
    }
    return result;
}

function logging(prop, data, id) {
    console.log(prop + ':' + data + '---->' + id)
}

/**
 * No distance needed
 */
