import age, { name } from './data.js';
import * as total from './data.js';

// * 号导入，会把导入项和 default 一起返回
console.log('* import::: ',total);
console.log('normal import age: %s, name: %s', age, name);

if (true) {
  // 动态导入文件
  import('./data.js').then(res => {
    console.log('import then res::: ', res.default, res.name);
  })
}

const awaitData = await import('./data.js');

console.log('await import name::: ', awaitData.name);


async function main() {
  // 动态导入文件
  const m = await import('./data.js');
  m.printName('hello');

  (await import('./data.js')).printName('world');
}

main()