let arr = [34,1,16,87,90,4,67,5,2]


function heapSort(array) {
  createHeap(array)

  for(let i = array.length - 1; i > 0; i--) {
    [array[i], array[0]] = [array[0], array[i]];
    adjust(array, 0, i)
  }
}

// 创建一个大根堆
function createHeap(array) {
  const len = array.length;
  //找到最后一个子树的根节点，从下往上，依次为每棵构造为大根堆
  const start = parseInt(len / 2) - 1;  
  for (let i = start; i >= 0; i--) {
    adjust(array, i, len)
  }
}

function adjust(array, target, len) {
  //i为当前子树的左孩子节点
  for(let i = 2 * target + 1; i < len; i = 2 * i + 1) {
    //找到两个孩子中较大的孩子节点的序号
    //这里 i+1 < len 比较重要，剔除了最后一个最大的节点
    if(i + 1 < len && array[i+1] > array[i]) {
      i = i + 1
    }
    //将较大的孩子节点与当前子树根节点进行比较
    if(array[i] > array[target]) {
      //把子孩子中较大的节点替换至根节点，保证始终是大根堆
      [array[i], array[target]] = [array[target], array[i]]
      //用target保存被沉下来的原根节点
      target = i
    }else {
      break;
    }
  }
}


// arr = [0,1,2,3,4,5,6,7]
// heapSort(arr)

// console.log(arr)
function myAdjust(arr, target, length) {
  for(let i = 2 * target + 1; i < length; i = i * 2 + 1) {
    if (i + 1 < length && arr[i] < arr[i+1]) {
      i = i + 1
    }
    if(arr[target] < arr[i]) {
      console.log('111111');
      [arr[i], arr[target]] = [arr[target], arr[i]];
      target = i;
    }else {
      break;
    }
  }
}

function myCreateHeap(arr) {
  let len = arr.length,
      start = Math.floor(len / 2) - 1;
  for(let i = start; i >= 0; i-- ) {
    myAdjust(arr, i, len)
    console.log(arr)
  }
}

// 从小到大排序
function myHeapSort(arr) {
  myCreateHeap(arr);

  for(let i = arr.length - 1; i > 0; i-- ) {
    [arr[i], arr[0]] = [arr[0], arr[i]];
    myAdjust(arr, 0, i);
  }
}

myHeapSort(arr)
console.log(arr)
