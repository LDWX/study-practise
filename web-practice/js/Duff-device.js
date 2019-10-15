let arr = ['a','b','c','d','e','f','g','h','i','j'],
    iterations = Math.floor(arr.length / 8),
    start = arr.length % 8,
    i = 0;

// Duff's Device算法
console.time('duff')
do {
  switch(start) {
    case 0: console.log(i++)
    case 7: console.log(i++)
    case 6: console.log(i++)
    case 5: console.log(i++)
    case 4: console.log(i++)
    case 3: console.log(i++)
    case 2: console.log(i++)
    case 1: console.log(i++)
  }
  start = 0;
}while(iterations--)
console.timeEnd('duff')

// 改进的 Duff's Device 算法
console.time('advance duff')
let startAt = i = arr.length % 8
while(i) {
  console.log( arr[--i] )
}
i = Math.floor(arr.length / 8)
while(i) {
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  console.log(arr[startAt++])
  i--;
}
console.timeEnd('advance duff')