new Promise(resolve => {
  console.log(6)
  resolve(1);
  
  new Promise( resolve => {
    console.log(5)
    resolve()
  }).then(() => {
    // t2
    console.log(2)
  });
  console.log(4)
}).then(t => {
  // t1
  console.log(t)
});
console.log(3);



/// 1 2 4 3
// console.log(1)
// new Promise( resolve => {
//   console.log(2)
//   resolve()
// }).then( () => {
//   console.log(3)
// })
// console.log(4)
