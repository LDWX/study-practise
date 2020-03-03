function fetch(name, time) {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve(name + " " + time)
    }, time * 500)
  })

}


function* generators() {
  let arr = [4, 3, 2, 1]
  let name = "initial"
  for (let i of arr) {
    name = yield fetch(name, i)
    
  }

  return "ending"
}


function run (func) {
  let it = func()
  
  let result = it.next()

  function step() {
    if (result.done) {
      console.log('done:: ', result)
      return result.value
    }; 
    
    !result.done && result.value.then( res => {
      console.log(res)
      result = it.next(res)
      step()
    })
  }

  step()
}


run(generators)

