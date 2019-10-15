var emptyObject = Object.freeze({});

var _toString = Object.prototype.toString
function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function noop(a, b, c) {}

function makeMap(
  str,
  expectsLowerCase,
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  console.log('makeMap map: ', map)
  return expectsLowerCase ? 
      function(val) {
        return map[val.toLowerCase];
      } :
      function(val) {
        return map[val]
      }
}

function cached(fn) {
  var cache = Object.create(null);
  return (function cachedFn(str) {
    var hit = cache[str]
    console.log("cache: ", cache)
    return hit || (cache[str] = fn(str))
  })
}

var camelizeRE = /-(\w)/g;
var camelize = cached(function(str) {
  return str.replace(camelizeRE, function(_, c) {
    console.log('_ is: %s, c is: %s', _, c)
    return c ? c.toUpperCase() : ""
  })
})

var capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
});

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while(i--) {
    console.log(i)
    ret[i] = list[i + start]
  }
  return ret
}

function genStaticKeys(modules) {
  return modules.reduce( function(keys, m) {
    let result = keys.concat(m.staticKeys || [])
    console.log('result is: ', result)
    return result
  }, []).join(',')
}

function looseEqual(a, b) {
  if (a === b) {
    return true
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    var isArrayA = Array.isArray(a);
    var isArrayB = Array.isArray(b);
    if (isArrayA && isArrayB) {
      return a.length === b.length && a.every( (val, i) => {
        return looseEqual(val, b[i])
      })
    }else if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }else if (!isArrayA && !isArrayB) {
      var keysA = Object.keys(a);
      var keysB = Object.keys(b);
      return keysA.length === keysB.length && keysA.every( (key) => {
        return looseEqual(a[key], b[key])
      })
    }else {
      return false
    }

  }else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  }else {
    return false
  }
}

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i
    }
  }
  return -1
}

function once(fn) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      console.log('arguments: ', arguments);
      fn.apply(this, arguments);
    } 
  }
}

function isReserved(str) {
  var c = (str + "").charCodeAt(0);;
  return c === 36 || c === 95;
}


var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));

function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.')
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      console.log(`segments ${i} is: ${segments[i]}`)
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
      console.log('obj is: ', obj)
    }
    return obj
  } 
}

var classifyRE = /(?:^|[-_])(\w)/g;

var classify = function(str) {
  return str
      .replace(classifyRE, function(c) {
          return c.toUpperCase();
      })
      .replace(/[-_]/g, '');
};


console.log(classify("guide-group"))
console.log(classify("shen_xin"))

// console.log(classifyRE.test('1'))
