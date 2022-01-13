export function before(beforeFn: any) {
    return function(target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value;

        descriptor.value = function() {
            beforeFn.apply(this, arguments);
            return oldValue.apply(this, arguments);
        };

        return descriptor;
    };
}

export function after(afterFn: any) {
    return function(target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value;

        descriptor.value = function() {
            const ret = oldValue.apply(this, arguments);
            afterFn.apply(this, arguments);
            return ret;
        };

        return descriptor;
    };
}

export function measure(target: any, name: any, descriptor: any) {
    const oldValue = descriptor.value;

    descriptor.value = async function() {
        const start = Date.now();
        const ret = await oldValue.apply(this, arguments);
        console.log(`${name}执行耗时 ${Date.now() - start}ms`);
        return ret;
    };

    return descriptor;
}
