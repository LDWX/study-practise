function fetch(x) {
  // return new Promise((resolve) => {
  //   setTimeout(function() {
  //     console.log(x)
  //     resolve(x)
  //   }, x * 500)
  // })
  
}

function *taskGen(array) {
   for (let item of array) {
      yield fetch(item)
   }
}


function run(task) {  
  function step() {
    let result = task.next();
    (!result.done && result.value) && result.value.then( (value) => {
      console.log(value)
      step()
    })
  }
  step()
}

let arr = [4,3,2]
run(taskGen(arr))