function merge(left, right) {
  let result = [],
      // tmpLeft = [...left],
      // tmpRight = [...right],
      leftLen = left.length,
      rightLen = right.length;

  while(leftLen && rightLen) {
    if (left[0] < right[0]) {
      result.push(left.shift())
      leftLen--;
    }else {
      result.push(right.shift())
      rightLen--;
    }
  }
  result = result.concat(left).concat(right)
  // console.log('left is: %s, right is: %s, result is: %s', tmpLeft, tmpRight, result)
  return result
}

// 递归实现归并排序
function mergeSort(items) {
  let itemsLen = items.length;
  if (itemsLen== 1) {
    return items;
  }

  let middle = Math.floor(itemsLen / 2),
      left = items.slice(0, middle),
      right = items.slice(middle);
  
  return merge(mergeSort(left), mergeSort(right))
}


let arr = [2,4,10,6,1,3,5,]

console.time('recursion')
let result = mergeSort(arr)
console.log(result)
console.timeEnd('recursion')

function iterateMergeSort(items) {
  let itemsLen = items.length
  if (itemsLen == 1) {
    return items;
  }

  let work = [];
  for (let i = itemsLen; i--;) {
    work.push([items[i]])
  }
  work.push([])
  for (let lim = itemsLen; lim > 1; lim = (lim+1)/2) {
    for (var j = 0, k = 0; k < lim; j++, k+=2) {
      work[j] = merge(work[k], work[k+1])
    }
    work[j] = []
  }
  return work[0]
}

console.time('iteration')
result = iterateMergeSort(arr)
console.log('result is: ',result)
console.timeEnd('iteration')