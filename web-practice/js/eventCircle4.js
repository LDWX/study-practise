
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async2 end')
}

// 这里加不加async会影响到async2 end 与 promise3的执行顺序
async function async2() {
  console.log('async2')
}

console.log('script start')

// setImmediate( function() {
//   console.log('setImmediate')
// })

setTimeout( function() {
  console.log('setTimeout0')
}, 0)

setTimeout( function() {
  console.log('setTimeout3')
}, 3 )

// process.nextTick( function() {
//   console.log('nextTick')
// })

async1()

new Promise( function(resolve) {
  console.log('promise1')
  resolve()
  console.log('promise2')
}).then( () => {
  console.log('promise3')
})

console.log('script end')


/**
 * script start
 * async1 start
 * async2
 * promise1
 * promise2
 * script end
 * 
 * nextTick
 * 
 * async2 end
 * 
 * promise3
 * 
 * setTimeout0
 * setImmediate
 * setTimeout3
 * 
 */