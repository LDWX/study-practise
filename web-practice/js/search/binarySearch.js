//二分查找
function binarySearch(target, arr, start, end) {
  if (start > end) return -1;
  while(start < end) {
    let mid = Math.floor((end + start) / 2);
    if (target == arr[mid]) {
      return mid
    } else if (target < arr[mid]) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
}

let arr = [1,2,3,4,5,6,7]
let target = 6
let resultIndex = binarySearch(target, arr, 0, arr.length - 1)
console.log(`${target} 在数组 ${arr} 中的索引为:${resultIndex}`)

function getNumberOfK(arr, target) {
  // if (arr && arr.length > 0 && k != null) {
  //   const firstIndex = getFirstK(target, arr, 0, arr.length - 1)
    
  // }
  if (!arr.length) return -1;
  let count = 0;
  let lenIndex = arr.length - 1;
  let firstIndex = binarySearch(target, arr, 0, lenIndex)
  if (firstIndex > 0) {
    count++
  }else {
    return -1;
  }
  let front = end = firstIndex;
  while (front > 0) {
    if (arr[--front] == target) {
      count++;
    }else {
      break;
    }
  }
  while (end < lenIndex) {
    if (arr[++end] == target) {
      count++
    }else {
      break;
    }
  }
  return count;
}

arr = [1,2,3,3,3,3,3,4,5,6,7,8]
target = 3
let resultCount = getNumberOfK(arr, target);
console.log(`${target} 在数组 ${arr} 中拥有 ${resultCount} 次`)