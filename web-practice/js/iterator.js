let obj = {
  arr: ['shenxin', 'wangya', 'hello', 'world'],
  next() {
    let done = this.index >= this.arr.length
    let value = this.arr[this.index++]
    return {
      done,
      value
    }
  },
  [Symbol.iterator]: function() {
    this.index = 0;
    return this
  }
}

for (let item of obj) {
  console.log(item)
}
console.log([...obj])
console.log([...obj])




// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())

