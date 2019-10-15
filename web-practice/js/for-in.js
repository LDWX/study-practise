
/**
 * for...in循环在循环数组时，获得的是当前数组的index，并不会遍历原型上的属性
 */
let arr = [1,2,3,4]

for (let item in arr ) {
  console.log(item)
}
console.log('==============array end=======================')

/**
 * 没有原型链的普通对象，for...in循环出来的仅仅是实例中的属性值
 */
let obj = {
  name: 'shenxin',
  age: 26
}

for (let item in obj) {
  console.log('obj item is: ', item)
}
console.log('===============obj end======================')

/**
 * 对于有原型链的对象，for...in循环会遍历实例及原型链属性
 * object.hasOwnProperty(attr)只有实例属性才会返回true
 */
function Parent() {
  this.parent = 'parent'
}

Parent.prototype.sayParent = function() {
  console.log('this is: ', this.parent)
}

function Child() {
  Parent.call(this)
  this.age = 12
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

let child = new Child()
console.time('Child for...in')
for (let item in child) {
  console.log('for...in Child item is: %s, hasOwnProperty is: %s', item, child.hasOwnProperty(item))
}
console.timeEnd('Child for...in')

console.time('Child for...of')
for(let item of Object.keys(child)){
  console.log('for...of Child item is: %s, hasOwnProperty is: %s', item, child.hasOwnProperty(item))
}
console.timeEnd('Child for...of')
console.log('=============child end========================')

let parent = new Parent()
for (let item in parent) {
  console.log('Object Parent item is: %s, hasOwnProperty is: %s', item, child.hasOwnProperty(item))
}
console.log('=============parent end========================')
