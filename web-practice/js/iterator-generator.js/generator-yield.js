// function* foo() {
//   yield "a"
//   return "hello"
//   yield "b"
// }


// function* bar() {
//   yield "x"
//   // for (let item of foo()) {
//   //   console.log(item)
//   // }
//   // 等价于
//   yield* foo()
//   yield "y"
// }


// for (let item of bar()) {
//   console.log(item)
// }


/**
 * 如果被代理的 Generator 函数有 return 语句，那么就可以向代理他的 Generator 函数返回数据
 */
// function* foo() {
//   yield 2;
//   return "foo";
//   yield 3;
// }

// function* bar() {
//   yield 1;
//   var v = yield* foo();
//   console.log("v: " + v);
//   yield 4;
// }

// var it = bar();

// console.log(it.next())
// // {value: 1, done: false}
// console.log(it.next())
// // {value: 2, done: false}
// console.log(it.next())
// // {value: 3, done: false}
// console.log(it.next())
// // "v: foo"
// // {value: 4, done: false}
// console.log(it.next())
// // {value: undefined, done: true}




/**
 * yield* 应用举例
 */
// function* iterTree(tree) {
//   if (Array.isArray(tree)) {
//     for (let i = 0; i < tree.length; i++) {
//       yield* iterTree(tree[i])
//     }
//   } else {
//     yield tree
//   }
// }

// let tree = ["a", ["b", "c"], ["d", "e"], "f"]
// for (let item of iterTree(tree)) {
//   console.log(item)
// }

// console.log( [...iterTree(tree)] )




/**
 * 通过使用 call 绑定， 来获取 Generator 函数中的this
 */
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
// var f = F.call(obj);
// 使用这种方法更好：
let f = F.call(F.prototype)

// let f = F()

console.log(f.next() )
console.log(f.next() )
console.log(f.next() )


console.log(f.a)
console.log(f.b)
console.log(f.c)