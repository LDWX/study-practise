// 栈与队列
// 执行顺序的不同: 栈 - 先入后出， 队列 - 先入先出

// 面试题: 实现一个栈
class Stack {
  constructor() {
    this.items = [];
  }

  // 添加新元素到栈
  push(element) {
    this.items.push(element);
  }

  // 移出栈顶元素
  pop() {
    return this.items.pop();
  }

  // 获取栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }

  // 判断空
  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }
}

// 扩展
// 判断括号有效性（自闭合）
// '{}[]' ture, '{{}[]' false, '[{()}]' true

const isValid = function(s: string) {
  // 涉及使用数据结构 - 栈
  const stack = new Stack();
  const map = {
    '}': '{',
    ']': '[',
    ')': '('
  };

  for(let i = 0; i < s.length; i++) {
    const char = s[i];

    stack.push(char);

    if (stack.size < 2) continue;

    const theLastOne = stack[stack.size - 1];
    const theLastTwo = stack[stack.size - 2];

    if (map[theLastTwo] === this.theLastTwo) {
      stack.pop();
      stack.pop();
    }
  }

  return stack.size === 0;
}
