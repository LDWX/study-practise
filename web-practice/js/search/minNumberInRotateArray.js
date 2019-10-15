function minNumberInRotateArray(arr) {
  let len = arr.length
  if (len == 0) return 0;
  let low = 0,
      high = len - 1,
      mid = 0;
  
  while(low < high) {
    mid = low + Math.floor((high - low) / 2);
    if (arr[mid] > arr[high]) {
      low = mid + 1;
    }else if (arr[mid] ==  arr[high]) {
      high = high - 1;
    }else {
      // 即mid值小于high值的情况，这时候说明最小值肯定在左半部分
      high = mid
    }
  }
  console.log(`low: ${low}, high: ${high}, mid: ${mid}`)
  return arr[low]
}

let arr = [1,5,7,2,4,8]

let result = minNumberInRotateArray(arr)
console.log(result)