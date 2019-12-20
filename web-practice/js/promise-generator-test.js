function run (taskDef) {
  let task = taskDef()

  function step() {
    let result = task.next();
    if (result.done)  return
    result.value && result.value.then( res => {
      console.log('this is then')
      step()
    })
  }

  step()
}

function* foo() {
  let arr = [4,3,2,1]
  for (let i of arr) {
    yield fetch(i)
  }
}

function fetch(i) {
  return new Promise( resolve => {
    setTimeout( () => {
      console.log(i)
      resolve()
    }, 1000*i)
  })
}

run(foo)