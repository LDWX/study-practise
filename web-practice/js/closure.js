/**
 * 当闭包与全局变量中变量名冲突时，会优先选择闭包
 */

let location = 'china'

function getLocation() {
  let location = 'America'
  return function() {
    console.log(location)
  }
}

let func = getLocation()
func()

///////////////////////////////////////////////

let name = 'helloworld'
let obj1 = {
  name: 'obj1',
  print() {
    return () => console.log(this.name)
  }
}
let obj2 = { name: 'obj2'}

obj1.print()()  // obj1
obj1.print.call(obj2)() // obj2
obj1.print().call(obj2) // obj1