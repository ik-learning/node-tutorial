var user = require('./user/index');
require('./module/bill');

function runHello() {
    var vasya = new user.User("Vasya");
    var petya = new user.User("Petja");
    vasya.hello(petya);
}


// global variable usage
var firstB = new Bill(4);
var secB = new Bill(34);
firstB.pay(secB);

if (module.parent) {
    exports.run = runHello;
} else {
    runHello();
}
