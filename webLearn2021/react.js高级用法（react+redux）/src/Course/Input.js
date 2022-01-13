// 这是⼀个能够正常运⾏的组件，没有任何逻辑问题，
// ⽗组件通过"点击聚焦"按钮可以使⼦组件内的输⼊框聚焦
import React, { forwardRef, Component, createRef } from 'react';

const insertLog = WrappedComponent => {
  class Log extends Component {
    componentDidUpdate(...args) {
    console.log(...args);
  }
  render() {
    const { forwardedRef, ...props } = this.props
     return <WrappedComponent {...props} ref={forwardedRef} />
     }
   }
  return forwardRef((props, ref) => <Log {...props} forwardedRef={ref} />);
}



class Sub extends Component {
 input = createRef()
 focus = () => { // focus ⽅法执⾏时会让 input 元素聚焦。
  this.input.current.focus();
 }
  render() {
   return <input {...this.props} ref={this.input} />;
  }
}



export default class Parent extends Component {
  state = {
   value: ''
  }
  input = createRef() // 引⽤⼦组件实例，便于调⽤实例上的⽅法
  onFocus = () => {
    this.input.current.focus(); // 调⽤⼦组件实例上的⽅法
  }
  onChange = e => {
    this.setState({ value: e.target.value });
  }
  Wrap = insertLog(Sub);
  render() {
    const Wrap = this.Wrap
    return <>
      <Wrap
        onChange={this.onChange}
        value={this.state.value}
        ref={this.input}
      />
      <button onClick={this.onFocus}>点击聚焦</button>
    </>;
  }
}