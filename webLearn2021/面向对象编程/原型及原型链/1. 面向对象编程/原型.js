function Player() {
    this.color = 'red';
}

Player.prototype.start = function () {
    console.log(111111);
}

const p1 = new Player();
const p2 = new Player();

console.log(p1.start === p2.start);
console.log(p1.constructor);