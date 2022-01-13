const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');

const schema = require('./schema.json');
const { module } = require('../webpack.base.conf');

const _transform = util.promisify(babel.transform);

module.exports = function(content, map, meta) {
    // 获取传参
    const _options = getOptions(this) || {};

    validate(schema, options, {
        name: 'babelLoader'
    })

    const callback = this.async();

    // 执行翻译
    _transform(content, _options)
        .then(({code, map}) => callback(null, code, map, meta))
        .catch(e => callback(e));
}