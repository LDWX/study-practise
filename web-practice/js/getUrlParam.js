let url = "http://www.hello.com?key=1&key=2&key=3&name=shenxin"
let url2 = "www.hello.comm"
let url3 = "www.hello.com?#search"

function getUrlParams(url, name) {
  let reg = /[a-zA-Z0-9]*=[a-zA-Z0-9]*/g
  let paramStrArr = url.match(reg)
  
  if (!paramStrArr) {
    return ""
  }
  let paramObj = {}
  
  paramStrArr.forEach( value => {
      let couple = value.split('=')
      let key = couple[0]
      let name = couple[1]
      if (paramObj[key]) {
          paramObj[key].push(name)
      }else {
        paramObj[key] = [name]
      }
  })
  
  if (name) {
    return paramObj[name]
  }else {
    return paramObj
  }
  
}

console.log( getUrlParams(url2) )