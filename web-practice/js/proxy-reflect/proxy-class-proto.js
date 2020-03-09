// 这个构造函数不能使用 class 模式，
// 使用 class 模式就无法触发 Base.prototype 的代理了
function Base() {
  this.address = "david street"
}

// class Base {
//   constructor() {
//     this.address = "david street"
//   }
// }

Base.prototype = new Proxy(this, {
  get (target, key) {
    console.log("trigger prototype proxy")
    throw new ReferenceError(`${key} doesn't exist`)
  }
})


class Square extends Base {
  constructor() {
    super()
    this.name = "shenxin"
  }
}

let shape = new Square()

console.log(shape.name)
console.log(shape.address)
console.log(shape.age)

let base = new Base()
console.log(base)