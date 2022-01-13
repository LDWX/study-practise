// 分治法 - 分而治之
// 工作原理（如何确定case适用分治）：
// 1. 可以明确设定一条基线
// 2. 根据此基线可以不停将问题进行分解，直到所有内容符合基线标准

const quickSort = function(arr) {
  // 校验
  if(arr.length <= 1) {
    return arr;
  }

  // 1. 找到基线，并对基线左右做声明
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];

  // 2. 遍历当前的内容，按照基线去划分左右
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // 3. 递归处理，不断根据新的基线生成新内容，并进行连接
  return quickSort(left).concat([pivot], quickSort(right));
}
// O(n) 到 O(logn)
