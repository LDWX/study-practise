class Plugin1 {
    apply(compiler) {
        // 不同的生命周期
        compiler.hooks.emit.tap('Plugin1', compilation => {
            console.log('hooks.emit');
        })
        compiler.hooks.afterEmit.tap('Plugin1', compilation => {
            console.log('hooks.afterEmit');
        })

        // 处理异步逻辑
        compiler.hooks.afterEmit.tapAsync('Plugin1', (compilation, cb) => {
            setTimeout(() => {
                console.log('hooks.tapAsync');
                cb();
            }, 1000)
        })
        // 处理异步promise
        compiler.hooks.afterEmit.tapPromise('Plugin1', compilation => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('hooks.tapPromise');
                    resolve();
                }, 1000)
            })
        })
    }
}