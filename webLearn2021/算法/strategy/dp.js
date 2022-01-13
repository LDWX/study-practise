// 动态规划(何时使用动态规划) - 将待求解的问题分解成若干子问题；子问题之间相互有联系
// F(0) = 0， F(1) = 1
// F(n) = F(n - 1) + F(n - 2), 其中n > 1

const fib = function(n) {
  // 传入校验
  if(n < 2) {
    return n;
  }

  // 1. 确定分界
  let pre = 0;
  let next = 0;
  let res = 1;
  // 2. 遍历所有内容进行运算执行
  for (let i = 2; i <= n; i++) {
    // 3. 所有内容项目进行关联与隔离
    pre = next;
    next = res;
    res = pre + next;
  }
  return res;
}

// git diff
