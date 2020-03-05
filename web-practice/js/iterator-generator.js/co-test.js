var co  = require("co")

function* foo() {
  let arr = [4,3,2,1]
  for (let i of arr) {
    yield fetch(i)
  }
}

function fetch(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x)
      resolve(x)
    }, 500 * x)
  })
}


// 使用 co 执行自己编写的生成器函数
// co(foo)


// co 中可以通过 try/catch 捕获异常，或者在执行结果后面添加 .catch 方法，
// 使用类似于 promise 的方式捕获异常
// errors can be try/catched
// co(function *(){
//   // try {
//     yield Promise.reject(new Error('boom'));
// //   } catch (err) {
// //     console.error(err.message); // "boom"
// //  }
// }).catch(onerror);

// function onerror(err) {
//   // log any uncaught errors
//   // co will not throw any errors you do not handle!!!
//   // HANDLE ALL YOUR ERRORS!!!
//   console.error(err.stack);
// }


co(function* () {
  let a =  yield [1];
  let b = yield [2];
  return [a, b]
}).then(res => {
  console.log(res.flat())
})

