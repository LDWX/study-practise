let arr = [1,2,3]
console.log(arr)

let total = 0

console.time('bad')
for(let i = 0; i < arr.length*100; i++) {
  total++
}
console.timeEnd('bad')


console.time('normal')
for(let i = arr.length*100; i > 0; i--) {
  total++
}
console.timeEnd('normal')


console.time('reverse')
//reverse 比 bad 快了 10倍！！！
for (let i = arr.length*100; i--;) {
  total++
}
console.timeEnd('reverse')