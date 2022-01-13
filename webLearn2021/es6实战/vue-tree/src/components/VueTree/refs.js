// tree对象类
// 基础能力提供
class Ref {
    constructor(opts, tree) {
        let name = this.name = opts.name;

        this.tree = tree;
        this.refs = {};
        refs[name] = this;
    }

    set(vm) {
        let cid = vm.cid;

        this.refs[cid] = vm;
    }

    get(cid) {
        return cid ? this.refs[cid] : this.tree;
    }
}

// 面向组件逻辑
// 一整棵树
let refs = {}

// 初始化工厂生产实例
let init = function(opts, tree) {
    let name = opts.name;

    if (!refs[name]) {
        return new Ref(opts, tree);
    }
    return refs[name];
}

// 销毁实例
let destroy = function(name) {
    refs[name] && delete refs[name];
}

// 设置节点
let set = function(name, vm) {
    refs[name] && refs[name].set(vm);
}

// 获取节点
let get = function(name, cid) {
    return refs[name] && refs[name].get(cid);
}

export default {
    init,
    destroy,
    get,
    set
}

