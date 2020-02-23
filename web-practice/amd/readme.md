index.js 依赖了 moduleA 与moduleB，
moduleB 依赖了 moduleA.


### 本实例演示了：
1. AMD 的使用方法
2. 为 module 自定义一个 id
3. 来一个 module 中 既依赖别的 module ，又将自身导出作为一个 module
4. 在一个 js 中，同时依赖多个 module.