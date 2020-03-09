let obj = {
  arr: ['shenxin', 'wangya', 'hello', 'world'],
  
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


let it = obj[Symbol.iterator]()
console.log( it.next())
console.log( it.next())
console.log( it.next())
console.log( it.next())
console.log( it.next())
