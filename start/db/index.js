
var phrases;

exports.connect = function () {
    phrases = require('./ru')
};

exports.getPhrase = function (name) {
    if(!phrases[name]) {
        throw new Error("Phrase not found: " + name)
    }
    return phrases[name];
};
