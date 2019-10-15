//使用生成器按顺序异步调用请求
function fetch(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x)
      resolve(x)
    }, 500 * x)
  })
}

function run(taskDef) {
  let task = taskDef();

  function step(){
    let result = task.next();
    if (!result.done&&result.value) {
      result.value.then((value) => {
        // console.log(value)
        step()
      })
    }
  }
  step();
}

run( function *() {
  let arr = [4,3,2,1]
  for (let i of arr) {
    yield fetch(i)
  }
})



