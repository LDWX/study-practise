# 作用域

作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。

换句话说，作用域决定了代码区块中变量和其他资源的可见性。

作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。

ES6 之前 JavaScript 没有块级作用域,只有全局作用域和函数作用域。ES6的到来，为我们提供了**块级作用域**,可通过新增命令let和const来体现。

## 全局作用域

在代码中任何地方都能访问到的对象拥有全局作用域。

* 最外层函数 和在最外层函数外面定义的变量拥有全局作用域

```js
var outVariable = "我是最外层变量"; //最外层变量
function outFun() { //最外层函数
    var inVariable = "内层变量";
    function innerFun() { //内层函数
        console.log(inVariable);
    }
    innerFun();
}
console.log(outVariable); //我是最外层变量
outFun(); //内层变量
console.log(inVariable); //inVariable is not defined
innerFun(); //innerFun is not defined
```

* 所有未定义直接赋值的变量自动声明为拥有全局作用域

```js
function outFun2() {
    variable = "未定义直接赋值的变量";
    var inVariable2 = "内层变量2";
}
outFun2();
console.log(variable); //未定义直接赋值的变量
console.log(inVariable2); //inVariable2 is not defined
```

* 所有window对象的属性拥有全局作用域

window.location

* 弊端

如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样就会 污染全局命名空间, 容易引起命名冲突。

## 函数作用域

函数作用域,是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。

```js
function doSomething(){
    var blogName="浪里行舟";
    function innerSay(){
        alert(blogName);
    }
    innerSay();
}
alert(blogName); // 报错
innerSay(); // 报错
```

作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行

## 块级作用域

块级作用域可通过新增命令let和const声明，所声明的变量在指定块的作用域外无法被访问。块级作用域在如下情况被创建：

* 在一个函数内部
* 在一个代码块（由一对花括号包裹）内部

let 声明的语法与 var 的语法一致。你基本上可以用 let 来代替 var 进行变量声明，但会将变量的作用域限制在当前代码块中。

块级作用域有以下几个特点：

* 声明变量不会提升到代码块顶部
* 禁止重复声明
* 变量只在当前块内有效

一道比较经典的面试题, 涉及作用域以及事件循环:

```js
for(var i = 0; i < 10; i++) {
	setTimeout(function(){
		console.log(i)
	})
}
// 输出 10 10 10 10 10 10 10 10 10 10

for(let i = 0; i < 10; i++) {
	setTimeout(function(){
		console.log(i)
	})
}
// 输出 0 1 2 3 4 5 6 7 8 9
```

第一个变量i是用var声明的，在全局范围内有效，所以全局中只有一个变量i，每次循环时，setTimeOut定时器里指的是全局变量i，而循环里的十个setTimeOut是在循环结束后才执行，所以输出十个10。

第二个变量i是用let声明的，当前的i
只在本轮循环中有效，每次循环的i其实都是一个新的变量，所以setTImeOut定时器的里面的i其实不是同一变量，所以输出0123456789

## 作用域链

有点类似于原型链, 在原型中我们找一个属性的时候, 如果当前实例找不到, 就会去父级原型去找.

作用域链也是类似的原理, 找一个变量的时候, 如果当前作用域找不到, 那就会逐级往上去查找, 直到找到全局作用域还是没找到，就真找不到了.

Tips: 那最先在哪个作用域里寻找呢? 在执行函数的那个作用域? 还是在创建函数的作用域?

记住！！ 要到创建这个函数的那个域”。 作用域中取值,这里强调的是“创建”，而不是“调用”

```js
var a = 10
function fn() {
  var b = 20
  function bar() {
    console.log(a + b) //30
  }
  return bar
}
var x = fn(),
  b = 200
x() //bar()
```

## Coding

1. 看一下输出

```js
var b = 10;
(function b(){
	b = 20;
    // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
    // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
	console.log(b); // fn b
    console.log(window.b); // 10
})();
```

* 函数表达式与函数声明不同，函数名只在该函数内部有效，并且此绑定是常量绑定。
* 对于一个常量进行赋值，在 strict 模式下会报错，非 strict 模式下静默失败。
* IIFE中的函数是函数表达式，而不是函数声明。


2. 看一下输出

```js
var a = 3;

function c() {
    alert(a);
}
(function () {
    var a = 4;
    c(); // 3
})();
```

3. 看一下输出

```js
function v() {
    var a = 6;
    function a() {

    }
    console.log(a); 
}

v(); // 6
```


```js
function v() {
    var a;
    function a() {

    }
    console.log(a); 
}

v(); // fn a
```

js会把所有变量都集中提升到作用域顶部事先声明好，但是它赋值的时机是依赖于代码的位置，那么js解析运行到那一行之后才会进行赋值，还没有运行到的就不会事先赋值。也就是变量会事先声明，但是变量不会事先赋值。

碰到这种问题可以先想一下变量提升和函数声明提升的规则, 原则上是变量被提升到最顶部, 函数声明被提升到最顶部变量的下方.

尝试着把这两段代码在大脑中编译一下：

* 第一段代码
```js
function v() {
    var a;
    function a() {

    }
    a=6;
    console.log(a);
}

v(); // 6
```

* 第二段代码

```js
function v() {
    var a;
    function a() {

    }
    console.log(a);
}

v(); // fn a
```

4. 看一下输出

```js
function v() {
    console.log(a); // fn a

    var a = 1;

    console.log(a); // 1

    function a() {

    }

    console.log(a); // 1

    console.log(b); // fn b

    var b = 2;

    console.log(b); // 2

    function b() {

    }

    console.log(b); // 2
}
v();
```

按照刚才的思路转换一下：

```js
function v() {
    var a;
    var b;
    function a() {}
    function b() {}

    console.log(a); // fn a
    a=1;
    console.log(a); // 1
    console.log(a); // 1

    console.log(b); // fn b
    b=2;
    console.log(b); // 2
    console.log(b); // 2
}
v();
```