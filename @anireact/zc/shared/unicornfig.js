const cosmiconfig = require('cosmiconfig');
const { getConfigHome } = require('platform-folders');
const { resolve } = require('upath');

const unicornfig = async place => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    if (place === 'global') return require(resolve(getConfigHome(), 'zc'));

    return (await cosmiconfig('zc').search()).config;
};

module.exports = {
    unicornfig,
};
