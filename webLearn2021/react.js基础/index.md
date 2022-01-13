# 【讲义】React基础


## 简介

React 是一个用于构建用户界面的 JAVASCRIPT 库，主要用于构建 UI，很多人认为 React 是 MVC 中的 V，起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它

1. 声明式设计 −React采用声明范式，可以轻松描述应用。
2. 高效 −React通过对DOM的模拟，最大限度地减少与DOM的交互。
3. 灵活 −React可以与已知的库或框架很好地配合。
4. JSX − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
5. 组件 − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
6. 单向响应的数据流 − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

## JSX
React 使用 JSX 来替代常规的 JavaScript，JSX 是一个看起来很像 XML 的 JavaScript 语法扩展，其实就是将js和html结合起来书写。

```jsx
const jsx = <p>hello, jerry</p>;

render() {
	return jsx;
}
```

## State
如果视图内的数据需要修改, 并且同时页面响应变化，我们需要将数据放在state中, 使用setState来修改数据。

```jsx
import React, { Component } from 'react'

export default class Clock extends Component {
  state = {
      date: new Date()
  }

  componentDidMount(){
      this.timer = setInterval(() => {
          this.setState({
              date: new Date()
          })
      }, 1000);
  }

  componentWillUnmount(){
      clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
      </div>
    )
  }
}
```

## Props
父子组件间的属性传递, 通过props进行.

```jsx
<App title="哈哈哈哈" />

<h2>{this.props.title}</h2>
```

## 条件渲染和循环 & 绑定事件
```jsx
import React, { Component } from "react";

export default class CartSample extends Component {
  //   状态初始化一般放在构造器中
  constructor(props) {
    super(props);

    this.state = {
      goods: [
        { id: 1, text: "爪哇前端课程" },
        { id: 2, text: "路白前端课程" }
      ],
      text: "",
      cart: []
    };

    this.addGood = this.addGood.bind(this);
  }

  //   回调函数声明为箭头函数
  textChange = e => {
    this.setState({ text: e.target.value });
  };

  addGood() {
    this.setState(prevState => {
      return {
        goods: [
          ...prevState.goods,
          {
            id: prevState.goods.length + 1,
            text: prevState.text
          }
        ]
      };
    });
  }

  //   加购函数
  addToCart = good => {
    // 创建新购物车
    const newCart = [...this.state.cart];
    const item = newCart.find(c => c.id === good.id);

    if (item) {
        item.count = item.count + 1;
    } else {
        newCart.push({ ...good, count: 1 });
    }
    // 更新
    this.setState({ cart: newCart });
  };

  //   处理数量更新
  add = good => {
    // 创建新购物车
    const newCart = [...this.state.cart];
    const item = newCart.find(c => c.id === good.id);
    item.count = item.count + 1;

    // 更新
    this.setState({ cart: newCart });
  };

  minus = good => {
    // 创建新购物车
    const newCart = [...this.state.cart];
    const item = newCart.find(c => c.id === good.id);
    item.count = item.count - 1;

    // 更新
    this.setState({ cart: newCart });
  };

  render() {
    //   const title = this.props.title ? <h1>this.props.title</h1> : null;
    return (
      <div>
        {/* 条件渲染 */}
        {this.props.title && <h1>{this.props.title}</h1>}

        {/* 列表渲染 */}
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={this.textChange}
          />
          <button onClick={this.addGood}>添加商品</button>
        </div>
        <ul>
          {this.state.goods.map(good => (
            <li key={good.id}>
              {good.text}
              <button onClick={() => this.addToCart(good)}>加购</button>
            </li>
          ))}
        </ul>

        {/* 购物车 */}
        <Cart data={this.state.cart} minus={this.minus} add={this.add} />
      </div>
    );
  }
}

function Cart({ data, minus, add }) {
  return (
    <table>
      <tbody>
        {data.map(d => (
          <tr key={d.id}>
            <td>{d.text}</td>
            <td>
              <button onClick={() => minus(d)}>-</button>
              {d.count}
              <button onClick={() => add(d)}>+</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

```

## 生命周期
1. 组件初始化阶段 initialization, 比如constructor
2. 组件挂载阶段 mount
	1. componentWillMount  组件挂载到DOM前调用,只会被调用一次, 这里写setState不会引起组件重新渲染
	2. render 返回一个react元素, react根据此函数的返回值渲染DOM. 不能在这里setState
	3. componentDidMount 组件挂载到DOM后调用, 且只会被调用一次
3. 组件的更新阶段 update
	1. componentWillReceiveProps(nextProps) 触发于props引起的组件更新过程中
	2. shouldComponentUpdate(nextProps, nextState) 比较之前和当前的props state是否有变化
	3. componentWillUpdate(nextProps, nextState) render方法前执行
	4. render
	5. componentDidUpdate(preProps, preState)
4. 组件的卸载阶段 unmount
	1. componentWillUnmount 卸载前调用, 在这里可以清理一些定时器

```jsx
import React, { Component } from "react";
export default class Lifecycle extends Component {
  constructor(props) {
    super(props);
    // 常用于初始化状态
    console.log("1.组件构造函数执行");
  }
  componentWillMount() {
    // 此时可以访问状态和属性，可进行api调用等
    console.log("2.组件将要挂载");
  }
  componentDidMount() {
    // 组件已挂载，可进行状态更新操作
    console.log("3.组件已挂载");
  }
  componentWillReceiveProps() {
    // 父组件传递的属性有变化，做相应响应
    console.log("4.将要接收属性传递");
  }
  shouldComponentUpdate() {
    // 组件是否需要更新，需要返回布尔值结果，优化点
    console.log("5.组件是否需要更新？");
    return true;
  }
  componentWillUpdate() {
    // 组件将要更新，可做更新统计
    console.log("6.组件将要更新");
  }
  componentDidUpdate() {
    // 组件更新
    console.log("7.组件已更新");
  }
  componentWillUnmount() {
    // 组件将要卸载, 可做清理工作
    console.log("8.组件将要卸载");
  }
  render() {
    console.log("组件渲染");
    return <div>生命周期探究</div>;
  }
}
```

## 组件化
课上讲代码