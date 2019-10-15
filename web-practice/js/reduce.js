var r = /a(b+)a/;
let str = '_abbba_aba_'
var arr = r.exec(str);

console.log(`arr: ${arr}`)
console.log(`arr.index: ${arr.index}`)
console.log(`arr.input: ${arr.input}`)


console.log('/////////////////////////')
let arr1 = r.exec(str);

console.log(`arr: ${arr1}`)
console.log(`arr.index: ${arr1.index}`)
console.log(`arr.input: ${arr1.input}`)