let arr = [1,34,16,87,90,4,67,5,2]

function bubbleSmall2Big(arr) {
  let arrLen = arr.length || 0
  for (let i = 0; i < arrLen; i++) {
    let complete = true
    for (let j = 0; j < arrLen - 1- i; j++  ) {      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        complete = false
      }
    }
    if (complete) {
      break;
    }
  }
}

bubbleSmall2Big(arr)
console.log('Small to Big', arr)

function bubbleBig2Small(arr) {
  let arrLen = arr.length || 0
  for (let i = 0; i < arrLen; i++) {
    let complete = true
    for (let j = 0; j < arrLen - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        complete = false
      }
    }
    if (complete) {
      break;
    }
  }
}

bubbleBig2Small(arr)
console.log('Big to Small: ', arr)