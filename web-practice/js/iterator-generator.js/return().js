function readArr(arr) {
  let index = 0
  return {
    [Symbol.iterator]() {
      return {
        next() {
          console.log('this is next index:  ', index)
          index++

          if (index > arr.length) return {
            done: true,
            value: 'all done'
          }

          return {
            done: false,
            value: arr[index - 1]
          }
        },
        return() {
          console.log('this is return index:  ', index, "\n\n")
          // console.log("//////////////////////////////////////////////")
          return {
            done: true,
            value: 'finish'
          }
        }
      }
    }
  }
}

let arr = [2,3,4,5,6,7]
// 使用方法一
for (let item of readArr(arr)) {
  console.log(item)
  break;
}

// 使用方法二
for (let item of readArr(arr)) {
  console.log("throw for:::", item)
  throw new Error("throw test")
}