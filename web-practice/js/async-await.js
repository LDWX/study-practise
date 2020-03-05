function step1() {
  return new Promise( resolve => {
    resolve(222)
  })
}


async function run () {
  let result = await step1().then(res => {
    return Promise.resolve("world")
  })

  console.log(result)
}

run()