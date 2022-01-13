// 贪婪 利益最大化 始终查找最大的项目，尽可能快满足需求
//
// 给定一个整数数组inputArr，找到一个具有最大和的连续子数组（子数组必须包含一个元素），返回其最大和
//
// 何时适用贪婪：需要查找最大项目等类型，同时满足利益最大化

const maxSubArray = function(inputArr) {
  // 传入值判断
  if(inputArr.length <= 1) return inputArr;

  let rtnArr = inputArr[0];
  let sum = 0;
  for (const num of inputArr) {
    // 最快扩充当前数据量or最短途径满足需求
    if (sum > 0) {
      sum += num;
    } else {
      sum = num;
    }
    rtnArr = Math.max(rtnArr, sum);
  }
  return rtnArr;
}
