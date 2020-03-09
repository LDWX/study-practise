function sum (...args) {  
  return args.reduce( (previous, current) => previous + current, 0)
}


let myProxy = new Proxy(sum, {
  apply(target, thisArg, args) {

    args.forEach( arg => {
      if (typeof arg !== "number") {
        throw new TypeError("所有参数必须为数字")
      }
    })

    let result = Reflect.apply(target, thisArg, args)
    return result
  },
  
  construct(target, args) {
    
    throw new TypeError("该函数不能通过 new 来调用")

    // let result = Reflect.construct(target, args)
    // console.log("construct result :::", result)
    // return result
  }
})


console.log(myProxy(1,2,3,4,5,6))


console.log(myProxy(1,"2",3,4,5,6))

console.log( new myProxy(1,2,3,4,5,6) )