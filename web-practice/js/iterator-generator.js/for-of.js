/** 例一 */
// function* foo() {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
//   return 6;
// }

// for (let v of foo()) {
//   console.log(v);
// }
// 1 2 3 4 5


/** 例二 */
// function* objectEntries(obj) {
//   let propKeys = Reflect.ownKeys(obj);

//   for (let propKey of propKeys) {
//     yield [propKey, obj[propKey]];
//   }
// }

// let jane = { first: 'Jane', last: 'Doe' };
// let nameSymbol = "name"
// jane[nameSymbol] = "shenxin"

// for (let [key, value] of objectEntries(jane)) {
//   console.log(`${key}: ${value}`);
// }

/** 例三 */
function* objectEntries() {
  // 这里不用 Reflect.ownKeys(this); 是因为，结果中想过滤掉 Symbol 字段
  let propKeys = Object.keys(this)

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]]
  }
}

let jane = {
  first: "jane",
  last: "Doe"
}
jane[Symbol.iterator] = objectEntries

for (let item of jane) {
  console.log(item)
  // console.log(`${key}: ${value}`)
}