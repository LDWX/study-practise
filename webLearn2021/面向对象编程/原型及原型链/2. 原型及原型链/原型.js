function Player() {
    this.color = 'red';
}

Player.prototype.start = function () {
    console.log(111111);
}

const p1 = new Player();
const p2 = new Player();



console.log(Player.prototype.constructor);