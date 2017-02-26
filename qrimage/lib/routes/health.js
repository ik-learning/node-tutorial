'use strict';
var os = require('os');
var properties = require('./../resources/properties');
var exports = module.exports = {};

exports.route = function (req, res) {
    prepareResponse(res, collectData())
};

function collectData() {
    return {
        application: properties.App,
        freeMem : os.freemem(),
        totalMem: os.totalmem(),
        cpu: os.cpus(),
        host: os.hostname(),
        upTime: os.uptime(),
        os_type: os.type(),
        os_relese: os.release()
    }
}

function prepareResponse(res, data) {
    res.header('Content-Type', "application/json");
    if (data) {
        // console.log(data);
        res.status(200).json(data);
    } else {
        res.status(404).json({ error : 'App is not running'});
    }
}
