// exports
var db = require('./../db');
// pattern module-factory
var log = require('./../logger')(module);

function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    // ...
    log(db.getPhrase('Hello') + ", " + who.name)
};

// ...

// console.log("user.js is required from modules");
module.exports = User;
// console.log(module);
