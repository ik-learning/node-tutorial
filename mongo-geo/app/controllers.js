var mongoose = require('mongoose');
var Location = mongoose.model('Location');

module.exports = {
    index: function (req, res, next) {
        res.status(200).json({
            status: 'Location API is running'
        });
    },
    findLocation: function (req, res, next) {
        console.log('INSIDE');
        var limit = req.query.limit || 10;

        var maxDistance = req.query.distance || 8;

        maxDistance /= 6371;

        var coords = [];
        coords[0] = req.query.longitude || 0;
        coords[1] = req.query.latitude || 0;

        console.log('Coordinates ' + coords);
        Location.find({
            loc: {
                $near: coords,
                $maxDistance: maxDistance
            }
        }).limit(limit).exec(function (err, locations) {
            if (err) {
                return res.json(500, err);
            }
            res.status(200).json(locations);
        });
    }
};