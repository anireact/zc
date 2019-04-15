const {
    access: access_,
    constants,
    copyFile: copy_,
    readFile: read_,
    realpath: real_,
    stat: stat_,
    writeFile: write_,
} = require('fs');

const mkdirp_ = require('mkdirp');
const rimraf_ = require('rimraf');
const { normalize } = require('upath');

const access = (path, mode) => {
    return new Promise(resolve => {
        access_(path, mode, error => {
            if (error) resolve(false);
            else resolve(true);
        });
    });
};

const copy = (from, to, flags) => {
    return new Promise((resolve, reject) => {
        copy_(from, to, flags, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

const exists = path => access(path, constants.R_OK | constants.W_OK); // eslint-disable-line no-bitwise

const mkdir = (path, options) => {
    return new Promise((resolve, reject) => {
        mkdirp_(path, options, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

const read = (from, options) => {
    return new Promise((resolve, reject) => {
        read_(from, options, (error, data) => {
            if (error) reject(error);
            else resolve(data);
        });
    });
};

const readjson = async (from, options) => {
    try {
        return JSON.parse(await read(from, options));
    } catch (error) {
        return {};
    }
};

const real = (path, options) => {
    return new Promise((resolve, reject) => {
        real_(path, options, (error, path) => {
            if (error) reject(error);
            else resolve(normalize(path));
        });
    });
};

const rimraf = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        rimraf_(path, options, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

const stat = (path, options) => {
    return new Promise((resolve, reject) => {
        stat_(path, options, (error, stats) => {
            if (error) reject(error);
            else resolve(stats);
        });
    });
};

const write = (to, data, options) => {
    return new Promise((resolve, reject) => {
        write_(to, data, options, error => {
            if (error) reject(error);
            else resolve();
        });
    });
};

module.exports = {
    access,
    constants,
    copy,
    exists,
    mkdir,
    read,
    readjson,
    real,
    rimraf,
    stat,
    write,
};
