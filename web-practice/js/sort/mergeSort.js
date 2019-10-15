let arr = [34,1,16,87,90,4,67,5,2]

function mergeSort(arr, left, right, tmp) {
  if (left < right) {
    const mid = Math.floor( (left + right) / 2 )
    mergeSort(arr, left, mid, tmp)
    mergeSort(arr, mid + 1, right, tmp)
    merge(arr, left, right, tmp)
  }
  return arr
}

function merge(arr, left, right, tmp) {
  console.log('left is: %s, right is: %s', left, right)
  const mid = Math.floor( (left + right) / 2 )
  let leftIndex = left,
      rightIndex = mid + 1,
      tmpIndex = 0;
  
  while(leftIndex <= mid && rightIndex <= right) {
    if (arr[leftIndex] < arr[rightIndex]) {
      tmp[tmpIndex++] = arr[leftIndex++]
    }else {
      tmp[tmpIndex++] = arr[rightIndex++]
    }
  }
  while(leftIndex <= mid) {
    tmp[tmpIndex++] = arr[leftIndex++]
  }
  while(rightIndex <= right) {
    tmp[tmpIndex++] = arr[rightIndex++]
  }
  tmpIndex = 0
  for(let i = left; i <= right; i++) {
    arr[i] = tmp[tmpIndex++]
  }
}
let tmp = []
let mergeResult = mergeSort(arr, 0, arr.length - 1, tmp)
console.log(mergeResult)