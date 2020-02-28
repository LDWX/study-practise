let target = {
  name: 'shenxin',
  age: 12
}

let proxy = new Proxy(target,{
  set(trapTarget, key, value, receiver) {
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(value)) {
        throw new TypeError('属性必须是数字')
      }
    }
    return Reflect.set(trapTarget, key, value, receiver)
  },
  get(trapTarget, key, receiver) {
    if (!(key in receiver)) {
      throw new TypeError("属性" + key + "不存在")
    }
    return Reflect.get(trapTarget, key, receiver)
  },
  deleteProperty(trapTarget, key) {
    if (key === 'name') {
      return false
    }else {
      return Reflect.deleteProperty(trapTarget, key)
    }
  },
  getPrototypeOf(trapTarget) {
    // 只能返回对象/null， 返回其他值则会导致运行时错误
    return Reflect.getPrototypeOf(trapTarget)
  },
  setPrototypeOf(trapTarget, proto) {
    // 返回非false值即视为成功
    return Reflect.setPrototypeOf(trapTarget, proto)
  }
})

// proxy.count = 11

// console.log(proxy.count)
// console.log(proxy.name)


// delete proxy.name
// delete proxy.age
// console.log('name' in proxy)
// console.log('target: ', target)

Object.setPrototypeOf(proxy, {
  nihao: 'world'
})
Object.setPrototypeOf(target, {
  hello: 'world'
})
let targetProto = Object.getPrototypeOf(target)
let proxyProto = Object.getPrototypeOf(proxy)

console.log("targetProto: ", targetProto)
console.log("proxyProto: ", proxyProto)
