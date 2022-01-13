class Parent {
    constructor() {
        this.name = 'aaa';
    }

    getName() {
        console.log('getname');
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const p1 = new Child();
p1.getName();