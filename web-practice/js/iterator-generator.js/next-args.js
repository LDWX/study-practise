function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  yield console.log("this is yield")
  return 'DONE';
});

let it = wrapped()

let result = it.next("hello world")
console.log("result is :::", result)


let result2 = it.next("shenxin")
console.log("result2 is :::", result2)