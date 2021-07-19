function bindFn(obj) {

  if (obj.name == 'shenxin') {
    bindFn = function(obj) {
      console.log(obj)
    }
  }else {
    bindFn = function(obj) {
      console.log(' this is else')
    }
  }
  // 外层的这个函数只会在第一次执行的时候执行
  console.log("this is origin bindFn")
  bindFn(obj)
}

const obj = {
  name: 'shenxin'
}
bindFn(obj)
bindFn(obj)
// this is origin bindFn
// { name: 'shenxin' } 
// { name: 'shenxin' }

