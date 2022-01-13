function Player() {
    this.color = 'red'
    this.start = function () {
        console.log(this.color);
    }
}
const p1 = new Player();
const p2 = new Player();

console.log(p1.start === p2.start);