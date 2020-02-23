console.log('script start')  

  async function async1() {
    console.log('async1')
    async2().then( () => {
      // setTimeout(() => {
        console.log('async2 end')
      // }, 0);
    })
    console.log('async1 end')
  }
  function async2() {
    return new Promise( (resolve, reject) => {
      console.log('async2')
      resolve()
    })
  }

  async1()
  setTimeout( function() {
    console.log('timeout1')
  },25)
  setTimeout( function() {
    console.log('timeout2')
  },0)

  new Promise( (resolve, reject) => {
    console.log('promise1')
    resolve()
  }).then( () => {
    console.log('promise2')
  }).then( () => {
    console.log('promise3')
  })

  console.log('script end')
    

// 1 4 2 5 3
// new Promise(resolve => {
//   console.log(1)
//   resolve()
// }).then( () => {
//   console.log(2)
// }).then(() => {
//   console.log(3)
// })

// new Promise(resolve => {
//   console.log(4)
//   resolve()
// }).then( () => {
//   console.log(5)
// })