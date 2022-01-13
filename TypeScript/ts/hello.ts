// 引入声明文件
/// <reference path="./global.d.ts" />


const sayHello: SayHello = (person: string) => {
  console.log('Hello, ' + person)
}


function getLength(something: string | number): number | string {
  return something;
}

interface Person2 {
  name: string;
  age: number;
  gender?: string;
  [propName: string]: string | number;
}
let tom: Person2 = {
  name: 'shenxin',
  age: 25,
  habit: 'run',
  sleep: 10
}
console.log(tom)

console.log('sayHello: ', sayHello('shenxin'))
