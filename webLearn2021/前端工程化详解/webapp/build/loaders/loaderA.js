// module.exports = function(content, map, meta) {
//     console.log('im loaderA');

//     return content;
// }

// pitch可以做正序逻辑
module.exports.pitch = function() {
    console.log('pitch A');
}

// 同步loader方式
module.export = function (content, map, meta) {
    console.log('im loaderA');

    this.callback(null, content, map, meta);
}