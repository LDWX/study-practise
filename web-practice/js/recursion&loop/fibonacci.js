// 斐波那契数列： 1 1 2 3 5 8 13 21 34 55

// 递归加记忆法
//存储计算中间值
function FibonacciStore(n, memory = []) {
  if (n < 2) return n

  if (!memory[n]) {
    memory[n] = FibonacciStore(n-1, memory) + FibonacciStore(n-2, memory)
  }
  return memory[n]
}

// 动态规划 + 存储中间值
let memory = new Map()
function FibonacciDynamic(n) {
  if (n < 2) return n;
  if (memory.has(n)) return memory.get(n)
  let i = 1,
  pre = 0,
  current = 1;
  while(i < n) {
    console.count('执行次数：')
    i++
    if (!memory.has(i)) {
      memory.set(i, pre + current);
      pre = current;
    } else {
      pre = memory.get(i-1)
    }
    current = memory.get(i);
  }

  return memory.get(i)
}

let num = 10;
let resultStore = FibonacciStore(num);
console.log(resultStore)
let resultDynamic = FibonacciDynamic(num);
console.log(resultDynamic)

console.log('memory: ', memory)

console.log(FibonacciDynamic(num))