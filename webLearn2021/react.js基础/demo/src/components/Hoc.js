import React, { Component } from "react";

const withLubai = Comp => {
  // 获取name,name可能来自于接口或其他手段
  const name = "高阶组件";
  console.log("do something");
  return class extends React.Component {
    componentDidMount() {
      
    }
    render() {
      return <Comp {...this.props} name={name} />;
    }
  };
};

const withLog = Comp => {
  console.log(Comp.name + "渲染了");
  return props => <Comp {...props} />;
};

@withLog
@withLubai
@withLog
class Lubai extends Component {
  render() {
    return (
      <div>
        {this.props.stage}-{this.props.name}
      </div>
    );
  }
}

// const NewLubai = withLog(withLubai(withLog(Lubai)));

export default class Hoc extends Component {
  render() {
    return (
      <div>
        <Lubai stage="React" />
      </div>
    );
  }
}
