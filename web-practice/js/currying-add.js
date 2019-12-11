let add = function(x) {
  return function(y) {
    return x + y
  }
}


let result = add(1)(2)

console.log( result )