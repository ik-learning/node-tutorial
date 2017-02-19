// module.exports = exports = this
var db = require('./db');
var User = require('./user/index');
require('./module/bill');

// connect to database
db.connect();

function runHello() {
    var vasya = new User("Vasya");
    var petya = new User("Petja");
    vasya.hello(petya);

    console.log(db.getPhrase('Run successful'))
}


// global variable usage
var firstB = new Bill(4);
var secB = new Bill(34);
firstB.pay(secB);

if (module.parent) {
    // console.log('Dudes');
    exports.run = runHello;
} else {
    runHello();
}
