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
function* foo() {
  yield 2;
  return "foo";
  yield 3;
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 4;
}

var it = bar();

console.log(it.next())
// {value: 1, done: false}
console.log(it.next())
// {value: 2, done: false}
console.log(it.next())
// {value: 3, done: false}
console.log(it.next())
// "v: foo"
// {value: 4, done: false}
console.log(it.next())
// {value: undefined, done: true}
