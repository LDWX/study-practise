let obj = {
  arr: ['shenxin', 'wangya', 'hello', 'world'],
  index: 0,
  
  [Symbol.iterator]() {
    let index = 0
    let _this = this
    return {
      next() {
        let done = index >= _this.arr.length
        let value = _this.arr[index]
        index++
        return {
          done,
          value
        }
      },
      getThis() {
        console.log(this)
        return this
      }
    }
  }
}
for (let item of obj) {
  console.log(item)
}

console.log([...obj])


// console.log(obj[Symbol.iterator]())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())



// let iter = obj[Symbol.iterator]()
// iter.getThis()