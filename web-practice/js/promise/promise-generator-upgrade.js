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
      // 所有 yield 全都执行完毕后的最后一次 next() 结果
      console.log('done:: ', result)
      return result.value
    }; 
    
    !result.done && result.value.then( res => {
      console.log(res)
      // 将上一个 yield 的执行结果传入下一个 yield 执行函数
      result = it.next(res)
      step()
    })
  }

  step()
}


run(generators)

