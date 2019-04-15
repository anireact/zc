const { resolve } = require('upath');

const { copy } = require('./fs');

const asset = (from, to, flags) => copy(resolve(__dirname, '..', 'assets', from), to, flags);

module.exports = {
    asset,
};
