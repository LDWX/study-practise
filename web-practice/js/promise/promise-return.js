function myPromise() {
  return new Promise( resolve => {
    resolve('hello')
  })
}

let p = myPromise()

let result = p.then( value => {
  console.log(value)
})

setTimeout( () => {
  console.log(result)
})