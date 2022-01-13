const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = require('./schema.json');

module.exports = function(content, map, meta) {
    const _options = getOptions(this);

    console.log('im ' + _options.name);

    validate(schema, _options, {
        name: "loaderKing"
    })

    return content;
}

// pitch可以做正序逻辑
module.exports.pitch = function() {
    console.log('pitch C');
}