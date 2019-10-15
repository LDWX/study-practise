let arr = [34,1,16,87,90,4,67,5,2]

// 递归算法
function quickSort(array, start, end) {
  if (end - start < 1) {
    return;
  }
  const target = array[start];
  let l = start;
  let r = end;
  while (l < r) {
    while (l < r && array[r] > target) {
      r--;
    }
    // array[l] = array[r];
    [array[l], array[r]] = [array[r], array[l]]
    while (l < r && array[l] < target) {
      l++;
    }
    // array[r] = array[l];
    [array[l], array[r]] = [array[r], array[l]]
  }
  // array[l] = target;
  console.log('middle: ', array)
  quickSort(array, start, l - 1);
  quickSort(array, l + 1, end);
  return array;
}

// console.log('递归算法：', quickSort(arr, 0, arr.length - 1))

// 非递归算法
function _quickSort(array, start, end) {
  let stack = [[start, end]]
  while (stack.length > 0) {
    let couple = stack.pop()
    if (couple[0] >= couple[1]) {
      continue
    }

    let l = couple[0],
        r = couple[1],
        flag = couple[0]
      
    while(l < r) {
      while(r > flag && array[r] >= array[flag]) {
        r--
      }
      if (r - l < 1) {
        break;
      }
      while(l < r && array[l] <= array[flag]) {
        l++
      }
      let tmp = array[flag]
      array[flag] = array[r]
      array[r] = array[l]
      array[l] = tmp
      flag = l
    }
    stack.push([couple[0], flag - 1])
    stack.push([flag + 1, couple[1]])
  }
  return array
}

// let _quickResult1 = _quickSort(arr, 0, arr.length - 1)
// console.log('非递归算法1：',_quickResult1)


function _quickSort2(arr, start, end) {
  let stack = [[start, end]]
  while(stack.length > 0) {
    let couple = stack.pop()
    let l = couple[0],
        r = couple[1],
        target = arr[l]
    if (r - l < 1) {
      continue;
    }
    while(l < r) {
      while(l < r && arr[r] > target) r--;
      [arr[l], arr[r]] = [arr[r], arr[l]]

      while(l < r && arr[l] < target) l++;
      [arr[l], arr[r]] = [arr[r], arr[l]]
      
    }
    stack.push([couple[0], l - 1])
    stack.push([l + 1, couple[1]])
  }
  return arr
}

// let _quickResult2 = _quickSort2(arr, 0, arr.length - 1)
// console.log('非递归算法2：',_quickResult2)





















function myQuickSort(arr, start, end) {
  let stack = [];
  stack.push([start, end]);
  while(stack.length > 0) {
    let couple = stack.pop();
    let l = couple[0],
        r = couple[1],
        target = arr[l];
    
    if (r - l < 1) {
      continue;
    }

    while(l < r) {
      console.count()
      while(l < r && arr[r] > target) r--;
      [arr[l], arr[r]] = [arr[r], arr[l]];
      
      while(l < r && arr[l] < target) l++;
      [arr[l], arr[r]] = [arr[r], arr[l]];
    }
    stack.push([couple[0], l - 1])
    stack.push([l + 1, couple[1]])

  }
}
myQuickSort(arr, 0, arr.length - 1)
console.log(arr)