/**
 * 实现一个简单的 commonjs 模块加载器，偏浏览器端的实现
 * 
 * 指导准则：COMMONJS 规范 -- 火狐的一个工程师
 * 
 * 2 个部分：
 * 
 * 1、模块加载器：解析文件地址，有一个寻找的规则，目的肯定就是找到文件
 * 2、模块解析器：执行文件内容的，Node 里面是使用了 v8 执行的
 */

class Module {
  constructor(moduleName, source) {
    // 暴露数据
    this.exports = {};
    // 保存一下模块的信息
    this.moduleName = moduleName;
    // 缓存
    this.$cacheModule = new Map();
    // 源代码
    this.$source = source;
  }

  /**
   * require
   * 
   * useage: require('./a.js')
   * 
   * @param {string} moduleName 模块的名称，其实就是路径信息
   * @param {string} source 文件的源代码，因为省略了加载器部分的实现，所以这里直接传入文件源代码
   * 
   * @return {object} require 返回的结果就是 exports 的引用
   */
  require = (moduleName, source) => {
    // 每一次 require 都执行文件内容的话，开销太大，所以加缓存
    if (this.$cacheModule.has(moduleName)) {
      // 注意，返回的是 exports
      return this.$cacheModule.get(moduleName).exports;
    }

    // 创建模块
    const module = new Module(moduleName, source);

    // 执行文件内容
    const exports = this.compile(module, source);

    // 放进缓存
    this.$cacheModule.set(moduleName, module);

    // 返回 exports
    return exports;
  }

  /**
   * // a.js
   * const b = require('./b.js');
   * 
   * b.action();
   * 
   * exports.action = function() {};
   * 
   * // b.js
   * const a = require('./a.js');
   * 
   * exports.action = function() {};
   */

  /**
   * 拼一个闭包出来，IIFE
   * 
   * @param {string} code 代码字符串
   */
  $wrap = (code) => {
    const wrapper = [
      'return (function (module, exports, require) {',
      '\n});'
    ];

    return wrapper[0] + code + wrapper[1];
  }

  /**
   * 简单实现一个能在浏览器跑的解释器 vm.runInThisContext
   * 核心的点是要创建一个隔离的沙箱环境，来执行我们的代码字符串
   * 
   * 隔离：不能访问闭包的变量 1，不能访问全局的变量 3，只能访问我们传入的变量 2
   * 
   * eval: 可以访问全局/闭包，但是需要解释执行，ES5 之后，如果是间接使用 eval
   *       -> (0, eval)('var a = b + 1'); ❌
   * new Function: 不可以访问闭包，可以访问全局，只编译一次 1 ✅
   * with: with 包裹的对象，会被放到原型链的顶部，而且底层是通过 in 操作符判断的 🤔
   *       如果通过 with 塞入我们传入的数据 2 ✅
   *       不管是啥属性，都从我们塞入的对象取值，取不到就返回 undefined，这样就永远不会访问全局的域了 3 ✅
   * 
   * unscopable: 这个对象是不能够被 with 处理的
   * @param {string} code 代码字符串
   */
  $runInThisContext = (code, whiteList=['console']) => {
    // 使用 with 保证可以通过我们传入的 sandbox 对象取数据
    // new Function 不能访问闭包
    const func = new Function('sandbox', `with(sandbox) {${code}}`);
    return function(sandbox) { // 👈 塞到文件源代码中的变量
      if (!sandbox || typeof sandbox !== 'object') {
        throw Error('sandbox parameter must be an object.');
      }

      // 代理
      const proxiedObject = new Proxy(sandbox, {
        // 专门处理 in 操作符的
        has(target, key) {
          if (!whiteList.includes(key)) {
            return true;
          }
        },
        get(target, key, receiver) {
          if (key === Symbol.unscopables) {
            return void 0;
          }
          return Reflect.get(target, key, receiver);
        }
      });

      return func(proxiedObject);
    }
  }


  /**
   * 执行文件内容，入参数是文件源代码字符串
   * 
   * IIFE: (function() {})(xxx, yyy);
   * 
   * function (proxiedSandbox) {
   *   with (proxiedSandbox) {
   *      return (function (module, exports, require) {
   *        // 文件内容字符串
   *      })
   *   }
   * }
   */
  compile = (module, source) => {
    // return (function(module, exports, require) { //xxxx }); ⚠️
    const iifeString = this.$wrap(source);
    // 创建沙箱的执行环境
    const compiler = this.$runInThisContext(iifeString)({});
    // (function(){ //xxx }) + ();
    // compiler + ();
    // -> compiler(); === compiler.call()
    compiler.call(module, module, module.exports, this.require);

    return module.exports;
  }
}

/**
 * demo 验证
 */
const m = new Module();

// a.js
const sourceCodeFromAModule = `
  const b = require('b.js', 'const a = require("a.js"); console.log("a module: ", a); exports.action = function() { console.log("execute action from B module successfully 🎉") }');

  b.action();

  exports.action = function() {
    console.log("execute action from A module!");
  }
`
m.require('a.js', sourceCodeFromAModule);
 
// require -> 【1、模块加载（获取文件字符串）2、解释执行字符串 3、exports 4、缓存】
// IIFE 的方式把 require 塞进文件模块所在的域里面