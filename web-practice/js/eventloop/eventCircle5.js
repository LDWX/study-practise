// 参考地址： https://juejin.im/post/5dc28ea66fb9a04a881d1ac0

console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function () {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
  })
  .then(function () {
    console.log('promise1')
  })
  .then(function () {
    console.log('promise2')
  })

console.log('script end')
/**
 * script start 
 * => async2 end 
 * => Promise 
 * => script end 
 * => promise1 
 * => promise2 
 * => async1 end 
 * => setTimeout
 */
// 在新版chrome浏览器中await的执行速度会比then要快，输出变为
/**
 * script start 
 * => async2 end 
 * => Promise 
 * => script end 
 * 
 * => async1 end **
 * 
 * => promise1 
 * => promise2 
 * => setTimeout
 */

