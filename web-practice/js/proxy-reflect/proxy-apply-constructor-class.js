class Person {
  constructor(name) {
    this.name = name
  }
}

let personProxy = new Proxy(Person, {
  // 可以通过运行的方式创建一个对象实例
  apply(target, thisArg, args) {
    
    return new target( ...args )
  }
})

// 正确创建一个实例
let me = personProxy("shenxin")
console.log(me.name)

// 会报错
let you = Person("wangya")

