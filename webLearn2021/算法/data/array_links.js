// 数组 & 链表
// 查找：数组连续，效率高。可以迅速定位到数组中某一个节点位置。而链表则需要通过前一个元素指向下一个元素地址，需要前后依赖，效率较低
// 插入：数组中元素插入会引起被插入位后所有元素索引的改变，而链表只需要改变某一个节点的next

// 面试题 实现链表
// head => node1 => node2 => ... => null
// 链表类结构
class LinkList {
  constructor() {
    this.length = 0;
    this.head = null; // 可以用作链表是否为空的判断
  }

  getElementAt(position) {} // 返回索引对应的元素

  append(element) {} // 添加节点

  insert(position, element) {} // 指定位置添加节点

  removeAt(position) {} // 删除指定位置元素

  indexOf(element) {} // 查找给定元素索引

  // ……
}

// 具体实现
getElementAt(position) {
  if(position < 0 || position >= this.length) return null;

  let current = this.head;
  for(let i = 0; i < position; i++) {
    current = current.next;
  }
  return current;
}

// 组装标准链表节点的辅助类
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// 生成复杂元素node
append(element) {
  let node = new Node(element);

  // 链表为空时
  if (this.head = null) {
    this.head = node;
  } else {
    // 找到尾巴
    let current = this.getElementAt(this.length - 1);

    current.next = node;
  }

  this.length++;
}

insert(position, element) {
  if (position < 0 || position > this.length) return false;

  let node = new Node(element);

  if (position === 0) {
    node.next = this.head;
    this.head = node;
  } else {
    // 找到位置
    let previous = this.getElementAt(position - 1);

    node.next = previous.next;
    previous.next = node;
  }

  this.length++;
  return true;
}

removeAt(position) {
  if (position < 0 || position > this.length) return false;

  let current = this.head;

  if (position === 0) {
    this.head = current.next;
  } else {
    let previous = this.getElementAt(position - 1);

    current = previous.next;
    previous.next = current.next;
  }

  this.length--;
  return current.element;
}

indexOf(element) {
  let current = this.head;

  for(let i = 0; i < this.length; i++) {
    if (current.element === element) return i;

    current = current.next;
  }

  return -1;
}

// 双向链表
// head <=> node1 <=> node2 <=> ... <=> null(tail)
// tail、prev
class DoubleLink extends LinkList {
  // ……
}
