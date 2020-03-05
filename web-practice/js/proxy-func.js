let func = function () {
  return 42
}


let myProxy = new Proxy(func, {
  apply(target, thisArg, args) {

    let result = Reflect.apply(target, thisArg, args)
    console.log("apply result :::", result)
    return result
  },
  
  construct(target, args) {
    
    let result = Reflect.construct(target, args)
    console.log("construct result :::", result)
    return result
  }
})


console.log( typeof myProxy )

console.log(myProxy())

let instance = new myProxy()
console.log(instance instanceof myProxy)
console.log(instance instanceof func)