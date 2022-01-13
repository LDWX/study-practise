// 图 与 图算法
// 构成： 边集合 + 顶点集合
// 分类： 有向图、无向图、构造图（复合引用）
//
// 试题 实现图类

class Graph {
  constructor(v) {
    this.vertices = v;  // 确定顶点数
    this.edges = 0; // 边集合数
    this.arr = [];
    // 初始化描述数组 - 多少个顶点就有多少元素可以进行连接
    for (let i = 0; i < this.vertices; i ++) {
      this.arr[i] = [];
    }
  }

  // 边操作
  addEdge(v, w) {
    this.arr[v].push(w);
    this.arr[w].push(v);
    this.edges++;
  }

  // 绘图
  showGraph() {
    for(let i = 0; i < this.vertices; i++) {
      let str = i + '->';
      for (let j = 0; j < this.certices; j++) {
        if(this.arr[i][j] !== undefined) {
          str += this.arr[i][j];
        }
      }
    }
    console.log(str);
  }
}

// 图来解决（什么时候用图） - 路径类问题、查找类问题
// 图解决深度优先问题
// 起始点开始查找直到最末的顶点，再返回追溯，直到没有路径为止
constructor() {
  //...
  this.marked = [];  // 已经被访问过的节点
  for(let i = 0; i < this.vertices; i++) {
    this.marked[i] = false;
  }
}

dfs(v) {
  this.marked[v] = true;
  if (this.arr[v] !== undefined) {
    console.log('visited' + v);
  }
  this.arr[v].forEach(w => {
    if (!this.marked[w]) {
      this.dfs(w);
    }
  })
}

// 广度优先 - 最相邻节点优先遍历
bfs(s) {
  let queue = [];
  this.marked[s] = true;
  queue.push(s);

  while(queue.length > 0) {
    let v = queue.shift();

    if (v !== undefined) {
      console.log('visited' + v);
    }

    this.arr[v].forEach(w => {
      if (!this.marked[w]) {
        queue.push(w);
        this.marked[w] = true;
      }
    });

  }
}

// 面试题 最短路径方法
// 利用广度优先天然临近查找的优势
// 1. 需要一个数组用来保存所有执行路径
// 2. 出了标记节点是否被访问过之外，添加一条边来描述顶点到当前顶点的路径

constructor() {
  // ...
  this.edgeTo = [];
}

bfs(s) {
  let queue = [];
  this.marked[s] = true;
  queue.push(s);

  while(queue.length > 0) {
    let v = queue.shift();

    if (v !== undefined) {
      console.log('visited' + v);
    }

    this.arr[v].forEach(w => {
      if (!this.marked[w]) {
        queue.push(w);
        this.marked[w] = true;
        this.edgeTo[w] = v; // 做一个连接顶点记录
      }
    });

  }
}

function pathTo(t, v) {
  let source = t;

  for (let i = 0; i < this.vertices; i++) {
    this.marked[i] = false;
  }

  this.bfs(source);

  if (!this.marked[v]) {
    return undefined;
  }

  let path = [];

  for (let i = v; i !== source; i = this.edgeTo[i]) {
    path.unshift(i);
  }
  path.unshift(source);

  let str = '';
  for (let i in path) {
    if (i < path.length - 1) {
      str += path[i] + '->';
    } else {
      str += path[i];
    }
  }
  console.log(str);
  return path;
}

// *********
let g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(1, 3);
g.addEdge(0, 4);
g.pathTo(0, 4);
