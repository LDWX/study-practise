import React, { Component } from 'react';
import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react';
// 创建 state
export class State {
  constructor() {
    // 这里不是自动处理，而是人为控制哪些数据具有响应能力，哪些方法是修改状态的
    makeObservable(this, {
      value: observable,
       // 注意 onChangeValue 不是属性声明的箭头函数，所以应当绑定 state 实例
      onChangeValue: action.bound,
    });
  }
  count = 0
  value = 0
  onChangeValue() {
    this.value++;
  }
  onChangeCount = () => {
    this.count++;
  }
}

@observer // state 同步
class Mobx extends Component {
  state = new State() // 注入 state
  render() {
    return (<>
      <button onClick={this.state.onChangeValue}>
        改变 value{ this.state.value }
      </button>
      &nbsp;
      <button onClick={this.state.onChangeCount}>
        改变 count{ this.state.count }
      </button>
      </>
    );
  }
}

export default Mobx;