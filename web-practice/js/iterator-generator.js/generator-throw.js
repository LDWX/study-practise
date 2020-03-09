/** 例一 */
// function* generator() {
//   try {
//     console.log('front')
//     yield;
//     console.log('back')
//   } catch(e) {
//     console.log("内部捕获：", e)
//   }
// }

// let it = generator()
// it.next()

// try {
//   it.throw("a")
//   it.throw("b")
// } catch(e) {
//   console.log("外部捕获： ", e)
// }
// 因为 Generator 函数内部的 catch 语句已经执行过了，所以第二次 throw 就无法捕获了，于是就被抛到了外部


/** 例二 */
/**
 * 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了
 */
// function* generator() {
//   yield 1;
//   console.log(" throwing an exception");
//   throw new Error("generator broke");
//   yield 2;
//   yield 3;
// }

// function log (generator) {
//   let v = "";
//   console.log("starting generator")
//   try {
//     v = generator.next()
//     console.log("第一次运行next")
//   } catch(e) {
//     console.log("捕获错误", v)
//   }

//   try {
//     v = generator.next()
//     console.log("第二次运行next")
//   } catch(e) {
//     console.log("捕获错误", v)
//   }

//   try {
//     v = generator.next()
//     console.log("第三次运行next")
//   } catch(e) {
//     console.log("捕获错误", v)
//   }

//   console.log("caller done")
// }

// log(generator())
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done


function* generator() {
  yield 1
  yield 2

  return "wangya"
}

let it = generator()

console.log( it.next() )
console.log( it.return("shenxin") )
