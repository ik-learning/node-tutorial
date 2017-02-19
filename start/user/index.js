// exports
var phrases = require('./ru.json');
function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    // ...
    console.log(phrases.Hello + ", " + who.name)
};

// ...

// console.log("user.js is required from modules");
module.exports = User;
// console.log(module);
