const stable = require('json-stable-stringify');

const stringify = (data, replacer, space) => {
    return stable(data, { replacer, space });
};

module.exports = {
    stringify,
};
