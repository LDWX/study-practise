class Vue {
    constructor(options) {
        const data = options.data;
        this._data = data;
        
        _proxy(this, '_data', data);
        observe(data);

        new Watch(this, function() {
            return data.name + ' create defineReactive'
        }, function() {
            console.log('Watch cb:', this.value);
        })
    }
}

const _proxy = function(vm, sourceKey, data) {
    const keys = Object.keys(data);

    keys.forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key];
            },
            set(val) {
                vm[sourceKey][key] = val;
            }
        })
    })
}

const observe = function(data) {
    const ob = new Observer(data);
}

class Observer {
    constructor(data) {
        this.walk(data);
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key);
        })
    }
}

const defineReactive = function(obj, key) {
    let val = obj[key];
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log('依赖收集');
            dep.depend();
            return val;
        },
        set(newVal) {
            val = newVal;
            console.log('发布更新');
            dep.notify();
        }
    })
}

class Dep {
    constructor() {
        this.id = Dep.uid++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    removeSub(sub) {
        const subIdx = this.subs.indexOf(sub);
        this.subs.splice(subIdx, 1);
    }

    notify() {
        this.subs.forEach(sub => sub.update());
    }
}
Dep.uid = 0;
Dep.target = null;

class Watch {
    constructor(vm, render, cb) {
        this.vm = vm;
        this.render = render;
        this.cb = cb;

        this.deps = [];
        this.depsIds = new Set();
        this.newDeps = [];
        this.newDepsIds = new Set();

        this.value = this.get();
        this.cb(this.value);
    }

    get() {
        Dep.target = this;

        this.newDeps = [];
        this.newDepsIds = new Set();

        const value = this.render();

        Dep.target = null;

        this.deps.forEach(oldDep => {
            const notExistInNewDeps = !this.newDepsIds.has(oldDep.id);
            if (notExistInNewDeps) {
                oldDep.removeSub(this);
            }
        });
        this.deps = this.newDeps;
        this.depsIds = this.newDepsIds;

        return value;
    }

    addDep(dep) {
        const depId = dep.id;

        if (!this.newDepsIds.has(depId)) {
            this.newDeps.push(dep);
            this.newDepsIds.add(depId);

            if (!this.depsIds.has(depId)) {
                dep.addSub(this);
            }
        }
    }

    update() {
        this.value = this.get();
        this.cb(this.value);
    }
}

