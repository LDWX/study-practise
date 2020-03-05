//在一个数组中包含多个异步操作，实现按顺序执行
//实现原理是使用生成器模拟async/await操作。

function p1() {
  return new Promise( (resolve, reject) => {
    setTimeout( () =>{
      // console.log('p1')
      resolve('p1')
    },4000)
  })
}
function p2() {
  return new Promise( (resolve, reject) => {
    setTimeout( () =>{
      // console.log('p2')
      resolve('p2')
    },3000)
  })
}
function p3() {
  return new Promise( (resolve, reject) => {
    setTimeout( () =>{
      // console.log('p3')
      resolve('p3')
    },2000)
  })
}

function *asyncPromise(array) {
  // 用 for 和 for...of都可以实现
  // for (let p of array) {
  //   yield p()
  // }
  for (let i = 0; i < array.length; i++) {
    yield array[i]();
  }
}


let array = [p1, p2, p3]
// 基于 Generator 和 Promise 的自动执行器
function run(it) {
  // let g = gen();
  function next() {
      let result = it.next();

      (!result.done&&result.value) && result.value.then((value) => {
        console.log(value)
        next()
      }); 
  }  
  next();
}

// run(gen);
run(asyncPromise(array));
