// module.exports = exports = this
var User = require('./user/index');
require('./module/bill');

function runHello() {
    var vasya = new User("Vasya");
    var petya = new User("Petja");
    vasya.hello(petya);
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
