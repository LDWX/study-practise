let arr = [1,34,16,87,90,4,87,67,5,2]

// 从小到大排序
function selectionSort(arr) {
  let arrLen = arr.length || 0
  let minIndex = 0
  for (let i = 0; i < arrLen; i++) {
    minIndex = i
    for (let j = i+1; j < arrLen; j++) {
      console.count('执行次数')
      if (arr[minIndex] > arr[j]) {       
        minIndex = j
      }      
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
  }
}

selectionSort(arr)
console.log('选择排序，从小到大：', arr)