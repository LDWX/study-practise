
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const callback = function (...args) {
        resolve(args);
      };
      fn.apply(null, [...args, callback]);
    });
  }
}

function run (str1, str2, callback) {
  setTimeout( function() {
    console.log('setTimeout: ',str1)
    callback(str1, str2)
  }, 1000)

}

const func = promisify(run);
func('a', 'b')
  .then((res,res1) => {
    console.log(res)
    console.log(res1)
  })
  .catch(err => console.warn('Catch error:', err));
