function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  yield "test"
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next("hello");
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b