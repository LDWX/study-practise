function sayHello (person: string): void {
  console.log('Hello, ' + person)
}


function getLength(something: string | number): number | string {
  return something;
}

interface Person2 {
  name: string;
  age: number;
  gender?: string;
  [propName: string]: string;
}
let tom: Person2 = {
  name: 'shenxin',
  age: 25,
  habit: 'run',
  sleep: 10
}
console.log(tom)