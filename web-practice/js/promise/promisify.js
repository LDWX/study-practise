
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const callback = function (...params) {
        // 如果既想拿到callback中的参数，又想拿到func中的参数，则在这里将两个参数进行合并：
        params = [...params, ...args]
        resolve(params);
      };
      fn.apply(null, [...args, callback]);
    });
  }
}

function run (str1, str2, callback) {
  setTimeout( function() {
    console.log('setTimeout: ',str1)
    callback( "shenxin", "wangya")
  }, 1000)

}

const func = promisify(run);
func('a', 'b')
  .then((res,res1) => {
    console.log(res)
    console.log(res1)
  })
  .catch(err => console.warn('Catch error:', err));
