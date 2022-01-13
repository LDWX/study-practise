# this指针详解

## 概念

可以认为this是当前函数/当前模块的运行环境的上下文, 是一个指针型变量, 可以理解为一个动态的对象, 普通函数中的this是在调用时才被绑定确认指向的.

this的出现, 使得复用函数时可以使用不同的上下文, 也就是说通过不同的this调用同一个函数, 可以产出不同的结果。

所以就显而易见出现一个问题, 既然this是一个动态的东西, 我们应该怎么判断它到底绑定的是什么内容呢?

## this的绑定规则

### 1. 默认绑定

指函数独立调用的时候，不带任何修饰的函数引用。

* 非严格模式下 this 指向全局对象(浏览器下指向 Window，Node.js 环境是 Global ）
* 严格模式下，this 绑定到 undefined ,严格模式不允许this指向全局对象。


比如如下代码, 如果在浏览器环境下执行, 严格模式和非严格模式的结果是不同的：

* 非严格模式会输出 hello
* 严格模式会报错, Uncaught TypeError: Cannot read properties of undefined (reading 'a')

```js
var a = 'hello'

var obj = {
    a: 'lubai',
    foo: function() {
        // 'use strict';
        console.log(this.a)
    }
}

var bar = obj.foo

bar() // hello
```

Tips: 普通函数做为参数传递的情况, 比如setTimeout, setInterval, 非严格模式下的this指向全局对象

```js
var name = 'lubai';
var person = {
    name: 'hahahahahah',
    sayHi: sayHi
}
function sayHi(){
    console.log(this); // { name: hahahahhah, sayHi: Fn }
    setTimeout(function(){
        console.log('Hello,', this.name); // Hello, lubai
    })
}
person.sayHi();
```

### 2. 隐式绑定

与默认绑定相反, 函数调用的时候有显式的修饰, 比如说某个对象调用的函数。

比如下面这段代码, foo 方法是作为对象的属性调用的，那么此时 foo 方法执行时，this 指向 obj 对象。

```js
var a = 'hello'

var obj = {
    a: 'lubai',
    foo: function() {
        console.log(this.a)
    }
}

obj.foo(); // lubai
```

Tips: 那如果有链式调用的情况呢? this会绑定到哪个对象上?

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person2 = {
    name: 'lubai',
    sayHi: sayHi
}
var person1 = {
    name: 'hahhahaahh',
    friend: person2
}

person1.friend.sayHi(); // Hello, lubai
```

### 3. 显式绑定

通过函数call apply bind 可以修改函数this的指向(call 与 apply 方法都是挂载在 Function 原型下的方法，所有的函数都能使用)

#### call 和 apply

call和apply都是改变函数的this指向并且执行, 那么有什么异同呢?

* call和apply的第一个参数会绑定到函数体的this上，如果不传参数，例如fun.call()，非严格模式，this默认还是绑定到全局对象
* call函数接收的是一个参数列表，apply函数接收的是一个参数数组。

```js
func.call(this, arg1, arg2, ...)
func.apply(this, [arg1, arg2, ...])
```

```js
var person = {
    "name": "lubai"
};

function changeWork(company, work) {
    this.company = company;
    this.work = work;
};

changeWork.call(person, '字节', '前端');
console.log(person.work); // '前端'

changeWork.apply(person, ['腾讯', '产品']);
console.log(person.work); // '产品'
```

Tips: 如果我们调用call和apply时, 传入的是基本类型数字或者字符串, 绑定this的时候会把他们转换成对象

```js
function getThisType () {
    console.log('this指向内容',this, typeof this);
}
getThisType.call(1); // this指向内容 Number {1} object
getThisType.apply('lubai');  // this指向内容 String {'lubai'} object
```

#### bind

bind 方法 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数.

```js
func.bind(thisArg[, arg1[, arg2[, ...]]])
```

看下面这段代码

```js
var publicAccounts = {
    name: '爪哇',
    author: 'lubai',
    subscribe: function(subscriber) {
        console.log(`${subscriber} ${this.name}`)
    }
}

publicAccounts.subscribe('部部')   // 部部 爪哇

var subscribe1 = publicAccounts.subscribe.bind({ name: '测试名称A', author: '测试作者B' }, '测试订阅者C')

subscribe1()       // 测试订阅者C 测试名称A
```

### 4. new绑定

new的作用咱们上节课已经说过了, 这节课再简单提一下：

1. 创建一个空对象
2. 将空对象的 proto 指向原对象的 prototype
3. 执行构造函数中的代码
4. 返回这个新对象


构造函数中的this指向了新生成的实例studyDay.

```js
function study(name){
    this.name = name;
}
var studyDay = new study('lubai');
console.log(studyDay); // {name: 'lubai'}
console.log(studyDay.name); // lubai
```

### 5. this绑定的优先级

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定


* 看一下这段代码输出什么?

tips: 显示绑定优先级比隐式绑定更高。
  
```js
function foo() {
    console.log(this.a)
}

var obj1 = {
    a: 2,
    foo: foo
}

var obj2 = {
    a: 3,
    foo: foo
}

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

* 再看下这段代码输出什么?

```js
function foo(something) {
    this.a = something
}
var obj1 = {
    foo: foo
}
var obj2 = {}

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); //4
```

* 再看下这段代码输出什么?

```js
function foo(something) {
　　this.a = something
}
var obj1 = {
}

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); //2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

## 箭头函数

箭头函数比较特殊, 咱们单独拎出来看.

* 箭头函数中没有 arguments

普通函数可以通过arguments拿到所有参数, 而箭头函数不可以, 如果你说你经常碰到也有在箭头函数中用arguments的, 那么真正拿的其实是外层的function。

```js
function constant() {
    return () => arguments[0]
}

let result = constant(1);
console.log(result()); // 1
```

如果要拿到所有箭头函数的参数, 我们可以直接用参数的解构

```js
let nums = (...nums) => nums;
```

* 箭头函数没有构造函数

箭头函数与正常的函数不同，箭头函数没有构造函数 constructor，所以也不能使用 new 来调用，如果我们直接使用 new 调用箭头函数，会报错。

```js
let fun = ()=>{}
let funNew = new fun(); 
// 报错内容 TypeError: fun is not a constructor
```

* 箭头函数没有原型对象

```js
let fun = ()=>{}
console.log(fun.prototype); // undefined
```

* 箭头函数中没有自己的this

箭头函数中如果用到了this, 那么this的指向由定义箭头函数的位置决定, 而不像普通函数是在调用时才绑定的.

咱们把上面讲到的默认绑定Tips的例子稍微改一下, 改成箭头函数看一下输出.
```js
var name = 'lubai';
var person = {
    name: 'hahahahahah',
    sayHi: sayHi
}
function sayHi(){
    console.log(this); // { name: hahahahhah, sayHi: Fn }
    setTimeout(() => {
        console.log('Hello,', this.name); // Hello, lubai
    })
}
person.sayHi();
```


## 练习

1. 看代码输出

```js
var name = '123';

var obj = {
	name: '456',
	print: function() {
		function a() {
			console.log(this.name);
		}
		a();
	}
}

obj.print(); // 123
```

2. 看代码输出

```js
function Foo(){
    Foo.a = function(){
        console.log(1);
    }
    this.a = function(){
        console.log(2)
    }
}

Foo.prototype.a = function(){
    console.log(3);
}

Foo.a = function(){
    console.log(4);
}

Foo.a(); // 4
let obj = new Foo();
obj.a(); // 2
Foo.a(); // 1
```

3. 看代码输出

```js
var length = 10;
function fn() {
    console.log(this.length);
}
 
var obj = {
  length: 5,
  method: function(fn) {
    fn(); // 10
    arguments[0](); // 2,  arguments: { 0: fn, 1: 1, length: 2 }
  }
};
 
obj.method(fn, 1);
```

4. 手写实现call apply bind