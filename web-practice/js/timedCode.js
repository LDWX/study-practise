function timedProcessArray(items, process, callback) {
  console.log('start')
  var todo = items.concat()

  setTimeout( function() {
    // console.count('setTimeout')
    var start = +new Date()

    do {
      process(todo.shift())
    }while (todo.length > 0 && (+new Date() - start < 50))

    if (todo.length > 0) {
      setTimeout(arguments.callee, 25)
    }else {
      callback(items)
    }

  }, 25)

  
}


let arr = new Array(10000)
arr.fill(1)
let process = function(item) {
  let i = 0
  for (let j = 0; j < 10000; j++) {
    i += item
  }
}
console.time('count')
timedProcessArray(arr, process, function(items) {
  console.log('finished')
  console.timeEnd('count')
})


console.time('normal')
for (let i = arr.length; i--;) {
  process(arr[i])
}
console.timeEnd('normal')