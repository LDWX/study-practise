let obj = {
  service1: '111',
  service2: '222'
}



const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});



// async function test() {
//   const [...keys] = await Promise.all([promise1, promise2, promise3])
//   console.log(keys[0], keys[1])
// }

// test();




const keys = [
	'service1',
  'service2'
]
const resList = [
  {
    key: 'data1'
  },
  {
    key: 'data2'
  }
]

let result = {}
resList.forEach((res, index) => {
  result[keys[index]] = res;
})

console.log('#### ', result)
