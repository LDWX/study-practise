let obj = {
}

let myProxy = new Proxy( obj, {
  get (target, key, receiver) {

    return Reflect.get(target, key, receiver)
  },

  set (target, key, value, receiver) {
    // console.log('this is set trap')

    return Reflect.set(target, key, value, receiver)
    // 等价于
    // target[key] = value
    // return true
  },

  has (target, key) {
    if (typeof key == "number") {
      return false
    }
    return Reflect.has(target, key)
  },

  deleteProperty (target, key) {

    return Reflect.deleteProperty(target, key)
  },

  getPrototypeOf (target) {

    return Reflect.getPrototypeOf(target)
  },

  setPrototypeOf (target, proto) {

    return Reflect.setPrototypeOf(target, proto)
  },

  isExtensible(target) {  

    return Reflect.isExtensible(target)
  },

  preventExtensions(target) {

    return Reflect.preventExtensions(target)
  },

  defineProperty(target, key, descriptor) {

    // if (typeof key === 'symbol') {
    //   return false
    // }

    return Reflect.defineProperty(target, key, descriptor)
  },

  getOwnPropertyDescriptor(target, key) {

    return Reflect.getOwnPropertyDescriptor(target, key)
  },
  
  ownKeys (target) {

    let list = Reflect.ownKeys(target)

    return list.filter( key => {
      return typeof key !== "string" || key[0] !== "_"
    })
    
  }
})


let addressSymbol = Symbol("myAddress")

console.log(addressSymbol)

// let test = {

// }

// test[addressSymbol] = "hellowold"
// console.log(test)

myProxy.address = "proxy"
myProxy._address = "_proxy"
myProxy[addressSymbol] = "address"


console.log(Object.getOwnPropertyNames(obj))
console.log(Object.getOwnPropertyNames(myProxy))



// myProxy.address = 111

// console.log(myProxy.address)
// console.log(obj.address)



// Object.preventExtensions(myProxy)

// myProxy.address = "hello world"

// console.log(obj.address)

// myProxy.age = 28

// console.log(myProxy.age)
// console.log(obj.age)

// console.log("age" in myProxy)


// let objProto = Object.getPrototypeOf(obj)
// let proxyProto = Object.getPrototypeOf(myProxy)
// console.log(objProto)
// console.log(proxyProto)

// console.log(myProxy.__proto__)
