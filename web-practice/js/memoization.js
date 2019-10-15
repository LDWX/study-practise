/**
 * 使用缓存机制的阶乘函数
 */
function memfactorial(n) {
  console.count('memfactorial')
  if (!memfactorial.cache) {
    memfactorial.cache = {
      0: 1,
      1: 1
    }
  }

  if (!memfactorial.cache.hasOwnProperty(n)) {
    memfactorial.cache[n] = n * memfactorial(n-1)
  }
  return memfactorial.cache[n]
}

let result = memfactorial(5)
console.log(result)

function factorial(n) {
  if (n === 0) {
    return 1;
  }else {
    return n * factorial(n-1)
  }
}

function memoize(fundamental, cache) {
  cache = cache || {}

  let shell = function(arg) {
    if (!cache.hasOwnProperty(arg)) {
      cache[arg] = fundamental(arg)
    }
    return cache[arg]
  }

  return shell
}

