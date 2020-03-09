let obj = {
  name: "shenxin"
}

let { proxy, revoke } = Proxy.revocable( obj, {
  set(target, key, value, receiver) {
    console.log("triggle set")
    return Reflect.set(target, key, value, receiver)
  }
})

// let proxies = new Proxy(obj, {
//   set(target, key, value, receiver) {
//     console.log("triggle set")
//     return Reflect.set(target, key, value, receiver)
//   }
// })

// proxies.address = "david street"


proxy.address = "hello world"

console.log(proxy.address)

revoke()

// 调用 revoke() 之后， proxy 不能再代理 obj 对象，
// 但之前在 proxy 上的操作结果依然存在与 obj对象
// console.log(proxy.name)
console.log(obj.address)

