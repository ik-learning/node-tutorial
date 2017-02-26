'use strict';
var qrgenerator = require('qr-image');
var exports = module.exports = {};

exports.route = function (req, res) {
    console.log('received');
    var location = req.body.location;
    console.log(location);

    generateImage(res);
   // prepareResponse(res, generateImage(res))
};

function generateImage(res) {
    var config = {
        ec_level: 'H',
        type: 'png',
        size: 5
    };
    var qr_svg = qrgenerator.image('I love QR! asdfasdfasdfasdf', config);
    res.type('png');
    qr_svg.pipe(res);
}

function prepareResponse(res, data) {
    // res.header('Content-Type', "image/png");
    // if (data) {
    //     // console.log(data);
    //     res.status(200).send(data);
    // } else {
    //     res.status(404).json({ error : 'App is not running'});
    // }
}
