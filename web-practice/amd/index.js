require(['moduleA', 'moduleB'], function(moudleA, moduleB) {
  let text = document.querySelector('#myText')
  text.innerHTML = moudleA
  let ele = document.createElement('div')
  ele.innerHTML = moduleB

  text.appendChild(ele)

})