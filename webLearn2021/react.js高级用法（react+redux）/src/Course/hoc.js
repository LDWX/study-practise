import React, { Component } from 'react';
import request from 'axios';

// const Page = hoc(WrappedComponent, api);
// <Page attr={1} />

/* 
const hoc = Component => (props) => {
  return <Component />
}
const hoc = Component => params => (props) => {
  return <Component />
}
const H = hoc(WrappedComponent)(params);  <H />
 */

export default function hoc(WrappedComponent, api) {
  return class extends Component {
    state = {
      query: {
        name: '',
        id: '',
        time: '',
        valid: ''
      },
      dataSource: []
    }

    onChange = (params) => {
      /* this.setState({
        query: {
          ...this.state.query,
          ...params
        }
      }); */
      // this.setState(state => ({ ...state, query, ...params }));
      
      request(api, {
        method: 'GET',
        params
      }).then(res => { // 这⾥暂不考虑异常
        this.setState({ dataSource: res.data });
      });
    }

    componentDidMount() {
      this.onChange(this.state.query);
    }

    render() { // this.props 就是 { attr: 1 }
      // WrappedComponent props 得到了 { attr, query, dataSource, onChange }
      return <WrappedComponent
        { ...this.props }
        { ...this.state }
        onChange = { this.onChange }
      />;
    }
  }
}
