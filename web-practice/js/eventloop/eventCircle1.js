console.log('global')

setTimeout(() => {
  console.log('timeout1')
},1000)
for (let i = 1;i <= 5;i ++) {
  setTimeout(function() {
    console.log(i*10)
  },i*1000)
  console.log(i)
}

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('then1')
})

setTimeout(function () {
  console.log('timeout2')
  new Promise(function (resolve) {
    console.log('timeout2_promise')
    resolve()
  }).then(function () {
    console.log('timeout2_then')
  })
}, 1000)