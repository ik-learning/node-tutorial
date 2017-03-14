var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationModel = function () {
    var LocationSchema = new Schema({
        name: String,
        loc: {
            type: [Number], // format will be  [ <longitude> , <latitude> ]
            index: '2d'  // create geospatial index
        }
    });
    // register the mongose model
    mongoose.model('Location', LocationSchema);
};

module.exports = LocationModel;