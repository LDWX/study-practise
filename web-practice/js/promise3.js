new Promise((resolve, reject) => {
  resolve('Success!')
})
.then(() => {
  throw Error('Oh noes!')
})
.catch(error => {
  return "actually, that worked"
})
.then(res => console.log(res))
.catch(error => console.log(error.message))


