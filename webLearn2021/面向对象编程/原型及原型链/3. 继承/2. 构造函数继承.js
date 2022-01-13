function Parent(name, color) {
    this.name = name;
    this.color = color;
    this.actions = ['sing', 'jump', 'rap'];
    this.eat = function () {}
}

function Child() {
    Parent.apply(this, arguments);
}

const c1 = new Child('c1', 'red');
const c2 = new Child('c2', 'white');

console.log(c1.eat === c2.eat);