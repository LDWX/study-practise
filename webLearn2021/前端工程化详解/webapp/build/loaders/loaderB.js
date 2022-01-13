// module.exports = function(content, map, meta) {
//     console.log('im loaderB');

//     return content;
// }

// pitch可以做正序逻辑
module.exports.pitch = function() {
    console.log('pitch B');
}

// 异步loader处理
module.exports = function(content, map, meta) {
    console.log('im loaderB');

    const callback = this.async();

    setTimeout(() => {
        callback(null, content);
    }, 1000);

    return content;
}