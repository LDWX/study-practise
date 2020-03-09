function toUnit32(value) {
  return Math.floor( Math.abs(Number(value)) % Math.pow(2, 32) )
}


function isArrayIndex(key) {
  let numericKey = toUnit32(key)
  return  String(numericKey) == key && numericKey < (Math.pow(2, 32) -1)
}

class MyArray {
  constructor(length = 0) {
    return new Proxy( { length }, {
      set(target, key, value) {
        let currentLength = Reflect.get(target, "length")
        
        if ( isArrayIndex(key) ) {
          let numericKey = Number(key)
    
          if (numericKey >= currentLength) {
            Reflect.set(target, "length", numericKey + 1)
          }
        } else if ( key == "length" ) {
          // 当主动设置 length 值， 并且length 值比当前索引要小时，
          // 循环删除大于 length 值的属性
          if (value < currentLength) {
            for (let index = currentLength - 1; index >= value; index--) {
              
              Reflect.deleteProperty( target, index )
            }
          }else if (value > currentLength) {
            // 当主动设置 length 值， 并且length 值比当前索引要大时，
            // 循环为多出来的索引赋初始值
            for (let index = currentLength; index < value; index++) {
              Reflect.set(target, index, null)
            }
          }
        }
    
        return Reflect.set(target, key, value)
      }
    })

  }
}

let colors = new MyArray(3)


colors[0] = "red"
colors[1] = "yellow"
colors[2] = "blue"
colors[3] = "green"

console.log(colors)
console.log(colors.length)

colors.length = 6



console.log(colors)
console.log(colors.length)