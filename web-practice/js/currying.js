let multiply = (n, m) => n * m
let curryedMultiply = (n) => ( m => multiply(n, m))

let triple = curryedMultiply(3)
// let result = triple(4)
// result = triple(5)

console.log(triple(4))
console.log(triple(5))