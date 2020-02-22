function* foo() {
  yield 'a'
  yield 'b'
}

function* bar() {
  yield 'x'
  yield* foo()
  yield 'y'

}

// for (let item of bar()) {
//   console.log(item)
// }

let task = bar()

console.log(task.next())
console.log(task.next())
console.log(task.next())
console.log(task.next())
console.log(task.next())