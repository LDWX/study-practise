// 算法复杂度 - 时间复杂度、空间复杂度
//
// 时间复杂度
// 1. 关注点在循环次数最多的代码块
// 2. 最大值原则 - 存在多个循环，总复杂度等于最大的代码块复杂度
// 3. 乘法原则 - 嵌套代码复杂度等于嵌套内外代码块复杂度的乘积

function total(n) {
  let sum = 0;        // t
  for (let i = 0; i < n; i++) { // nt
    sum += i; // nt
  }
  return sum; // t
}

// 执行了t + nt + nt + t = 2(n + 1)t长时间

function total(n) {
  let sum = 0;        // t
  for (let i = 0; i < n; i++) { // nt
    for (let j = 0; j < n; j++) { // n*n*t
      sum = sum + i + j; // n*n*t
    }
  }
  return sum; // t
}

// 执行了t + nt + n*n*t + n*n*t + t = (2n*n + n + 2)t
//
// n => 无穷大 O(n)\O(n*n)
//
// 常数阶 O(1)
// 对数阶 O(logN)

// 复杂度用例
const sum_plus = function() {
  let i = 1;
  let j = 2;

  ++i;
  j++;
  return i + j;
} // o(1)

const foo2 = function(n) {
  for(let i = 1; i <= n; ++i) {
    let j = i;
    j++;
  }
} // o(n)

const foo3 = function(n) {
  let i = 1;
  while(i < n) {
    i = i * 2;
  }
}
// i 等比变化 2^n
// 2的x次方等于n,那么x = log2^n
// 循环log2^n次以后，该段代码就结束了
// O(logN)

const foo4 = function(n) {
  for(let m = 1; m < n; m++) {
    let i = 1;
    while(i < n) {
      i = i * 2;
    }
  }
}
// O(nlogN)

function total(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum = sum + i + j;
    }
  }
  return sum;
}
// O(n^2)

// 空间复杂度
// 常量
let j = 0;
for (let i = 0; i < n; i++) {
  j++;
}// O(1)

// 线性增长
let j = [];
for (let i = 0; i < n; i++) {
  j.push(i);
} // O(n)

// ……指数log、嵌套
