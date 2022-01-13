// 1. 一个继承自 Player 的新对象 p1 被创建了。
// 2. p1.**proto** = Player.prototype，p1 的**proto**指向 Player 的原型对象
// 3. 将 this 指向新创建的对象 p1
// 4. 返回这个新对象 p1

function Player(name) {
    this.name = name;
}

function objectFactory() {
    // arguments [Player,'路白']
    let o = new Object();

    let FunctionConstructor = [].shift.call(arguments); // Player 参数,参数,
    o.__proto__ = FunctionConstructor.prototype;
    // arguments ['路白']

    let resultObj = FunctionConstructor.apply(o, arguments); // 参数数组
    return typeof resultObj === 'object' ? resultObj : o;
}

// const p1 = new Player();
const p1 = objectFactory(Player, '路白');

console.log(p1);