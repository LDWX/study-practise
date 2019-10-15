function deepCopy(obj) {
  let copy = {}
  if (obj == null || typeof obj != 'object') {
    return obj
  }
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  } 

  if (obj instanceof Function) {
    copy = function() {
      return obj.apply(this, arguments)
    }
    return copy
  }

  if (obj instanceof Object) {
    copy = {}
    for (let prop of Object.keys(obj)) {
      copy[prop] = deepCopy(obj[prop])
    }
    return copy
  }

}


let obj = {
  name: 'shenxin',
  time: new Date(),
  family: [
    {
      name: 'shenxiang',
      age: 12,
      habits: [1,2,4,new Date(), {"userId":62,"realname":"summer0011"}]
    }
  ]
}

let result = deepCopy(obj)

console.log(result)