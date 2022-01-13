// 元素创建型
// 功能： 创建元素
// 目的：规范创建步骤
//
// 工厂模式
// 隐藏创建过程、暴露共同接口
// 需求： 游戏商店里下载初始化游戏，并且可以运行游戏
class Shop {
  create(name) {
    return new Game(name);
  }
}

class Game {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log('init');
  }
  run() {
    console.log('run');
  }
}

const shop = new Shop();
const pubg = new Game('pubg');

pubg.init();
pubg.run();
// 创建商店时快速生产了游戏

// 建造者
// 拆分简单模块、独立执行 => 注重过程与搭配
// 需求：优惠套餐单元，商品 + 皮肤 进行打折售卖
//
class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log('Product init');
  }
}

class Skin {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log('Skin init');
  }
}

class Shop {
  constructor() {
    this.package = '';
  }
  create(name) {
    this.package = new PackageBuilder(name);
  }
  getGamePackage() {
    return this.package.getPackage();
  }
}

class PackageBuilder {
  constructor(name) {
    this.game = new Product(name);
    this.skin = new Skin(name);
  }
  getPackage() {
    return this.game.init() + this.skin.init();
  }
}
// 每个模块独立解耦，而建造者负责创建串联正题系统

// 单例模式
// 全局只有一个实例
class PlayStation {
  constructor() {
    this.state = 'off';
  }
  play() {
    if (this.state === 'on') {
      console.log('别闹，已经在happy了');
      return;
    }
    this.state = 'on';
    console.log('开始happy');
  }
  shutdown() {
    if (this.state === 'off') {
      console.log('已经关闭');
      return;
    }
    this.state = 'off';
    console.log('已经关机，请放心');
  }
  // static instance = undefined;
  // static getInstance() {
  //   return function() {
  //     if(!PlayStation.instance) {
  //       PlayStation.instance = new PlayStation();
  //     }
  //     return PlayStation.instance;
  //   }();
  // }
}

// main.js
PlayStation.instance = undefined;
PlayStation.getInstance = (function() {
  return function() {
    if(!PlayStation.instance) {
      PlayStation.instance = new PlayStation();
    }
    return PlayStation.instance;
  }()
}

const ps1 = PlayStation.getInstance();
ps1.play();

const ps2 = PlayStation.getInstance();
ps2.shutdown();

// 全局只要一个实例，不能乱

// 模式场景
// 1. 批量生产同类型应用来满足频繁使用同一种类型需求时 - 工厂模式
// 2. 当我们需要模块化拆分一个大模块，同时使模块间独立解耦分工 - 建造者模式
// 3. 全局只需要一个实例，注重统一一体化 - 单例

// 实际应用
// Button Producer：生产不同类型的按钮 => 生产多个本质相同，利用传参区分不同属性的元素 => 工厂
// 全局应用 router store => 只需要一个实例 => 单例
// 页头组件Header: 包含了title、button、breadcum => 生产多重不同类型的元素 => 建造者
