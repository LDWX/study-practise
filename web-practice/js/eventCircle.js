setTimeout(() => {
  console.log(1)
})


new Promise( (resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    console.log(3)
  })
  console.log(4)
  resolve()
}).then( () => {
  console.log(5)
})