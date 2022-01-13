function mockNew(Constructor, ...args) {
    const newObj = Object.create(Constructor.prototype);

    const res = Constructor.apply(newObj, args);

    return typeof res === 'object' ? res : newObj;
}