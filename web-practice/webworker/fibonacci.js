onmessage = function(e) {
  console.log("$$$$$$$$$$$$$$$$$$$")
  let data = e.data
  data **= 2

  postMessage(data)
}