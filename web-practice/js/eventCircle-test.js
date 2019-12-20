async function async1 () {
  console.log(1)
  await async2()
  console.log(3)
}


async function async2() {
  setTimeout( () => {
    console.log(2)
  }, 0)
}

async1()