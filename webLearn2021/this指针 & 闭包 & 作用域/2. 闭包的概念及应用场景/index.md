# 闭包的概念及应用场景

## 定义

闭包是指那些能够访问自由变量的函数。
自由变量是指在函数中使用的，但既不是函数参数也不是函数局部变量的变量。

1. 从理论角度：所有的函数都是闭包。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2. 从实践角度：以下函数才算是闭包：
	* 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
	* 在代码中引用了自由变量

## 应用场景

1. 柯里化函数
柯里化的目的在于：避免频繁调用具有相同参数函数，同时又能够轻松的复用。
其实就是封装一个高阶函数。

```js
// 假设我们有一个求长方形面积的函数
function getArea(width, height) {
    return width * height
}
// 如果我们碰到的长方形的宽老是10
const area1 = getArea(10, 20)
const area2 = getArea(10, 30)
const area3 = getArea(10, 40)

// 我们可以使用闭包柯里化这个计算面积的函数
function getArea(width) {
    return height => {
        return width * height
    }
}

const getTenWidthArea = getArea(10)
// 之后碰到宽度为10的长方形就可以这样计算面积
const area1 = getTenWidthArea(20)

// 而且如果遇到宽度偶尔变化也可以轻松复用
const getTwentyWidthArea = getArea(20)

```

2. 使用闭包实现私有方法/变量
其实就是模块的方式, 现代化的打包最终其实就是每个模块的代码都是相互独立的。

```js
function funOne(i){
    function funTwo(){
        console.log('数字：' + i);
    }
    return funTwo;
};
var fa = funOne(110);
var fb = funOne(111);
var fc = funOne(112);
fa();       // 输出：数字：110
fb();       // 输出：数字：111
fc();       // 输出：数字：112

```

3. 匿名自执行函数
```js
var funOne = (function(){
	var num = 0;
	return function(){
	    num++;
	    return num;
	}
})();
console.log(funOne());      // 输出：1
console.log(funOne());      // 输出：2
console.log(funOne());      // 输出：3

```

4. 缓存一些结果
比如在外部函数创建一个数组, 闭包函数内可以更改/获取这个数组的值，其实还是延长变量的生命周期，但是不通过全局变量来实现。

```js
function funParent(){
    let memo = [];
    function funTwo(i){
        memo.push(i);
        console.log(memo.join(','))
    }
    return funTwo;
};

const fn = funParent();

fn(1);
fn(2);
```

## 总结

* 创建私有变量
* 延长变量的生命周期
一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的

## 代码题

1. 实现compose函数, 得到如下输出

```js
// 实现一个compose函数, 用法如下:
function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x + 2;
}

function fn3(x) {
    return x + 3;
}

function fn4(x) {
    return x + 4;
}


const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
```

2. 实现一个柯里化函数

```js
function currying() {
    
}

const add = (a, b, c) => a + b + c;
const a1 = currying(add, 1);
const a2 = a1(2);
console.log(a2(3)) // 6
```