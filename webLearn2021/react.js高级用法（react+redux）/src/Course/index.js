import React, { Component } from 'react';
import Input from './Input'
import UseState from './UseState'
import UseRef from './UseRef'
import UseCallback from './UseCallback'
import UseContext from './UseContext'


 const insertLog = WrappedComponent => class extends Component {
  state = {
    count: 0
  }
  onClick = () => {
    this.setState({ count: 2 })
  }
   componentDidUpdate(...args) {
     console.log(...args);
   }
  render() {
     return <WrappedComponent {...this.props} onChange={this.onClick} count={this.state.count} />
  }
 }
 

class Course extends Component {
  render() {
    return (
      <div>
        Course<button onClick={this.props.onChange} >更新 {this.props.count}</button>
      </div>
    );
  }
}

const BaseWithLog = insertLog(Course);

export default UseContext