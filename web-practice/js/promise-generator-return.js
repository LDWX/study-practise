function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
    const foo2 = yield getFoo();
    console.log(foo2);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    console.log('result.done: ', result.done)
    if (result.done) return result.value;

    return result.value.then(function (value) {
      // return go(it.next(value));
      go(it.next(value))
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);