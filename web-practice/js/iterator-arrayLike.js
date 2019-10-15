
// 为对象创建一个迭代器
// 为类数组对象创建一个迭代器，使其能够通过for..of与解构进行遍历
let obj = {
  0: 'shen',
  1: 'xin',
  length: 2,
  *[Symbol.iterator]() {
    for (let i = 0; i < this.length; i ++) {
      yield this[i]
    }
  }
}

for (let val of obj) {
  console.log(val)
}
console.log([...obj])