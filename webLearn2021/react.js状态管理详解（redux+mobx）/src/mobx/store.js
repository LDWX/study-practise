import { observable, action, makeObservable } from 'mobx';

class Home {
  constructor() {
    makeObservable(this, {
      data: observable,
      onChange: action.bound,
    });
  }
  data = 'home'
  onChange(data) {
    this.data = data;
  }
}

class About {
  constructor() {
    makeObservable(this, {
      value: observable,
      onChange: action.bound,
    });
  }
  value = 'About'
  onChange(value) {
    this.value = value;
  }
}
// 上面的模块应该分散在各自的业务中，这里就不使用导入的方式了
export default {
  home: new Home(),
  about: new About()
}
// 下级组件使用时（也可以使用类组件，装饰器的形式注入）：