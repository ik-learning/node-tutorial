// global
function Bill(amount) {
    this.amount = amount;
}

Bill.prototype.pay = function (amount) {
    // ...
    console.log("Pay " + amount.amount)
};

console.log("Biil need to be paid");
global.Bill = Bill;
