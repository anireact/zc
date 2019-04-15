const Project = require('@lerna/project');
const { spawn: spawn_ } = require('cross-spawn');
const { delimiter, resolve } = require('upath');

class SpawnError extends Error {
    constructor(command, status, signal, pid, args, options) {
        super(`Process \`${command}\` (PID: ${pid}) finished with code ${status}${signal ? ` (${signal})` : ''}.`);

        this.name = 'SpawnError';

        this.pid = pid;
        this.status = status;
        this.signal = signal;
        this.arguments = args;
        this.options = options;
    }
}

const getEnv = (cwd, env = process.env) => {
    const { PATH = '' } = env;

    if (PATH === (process.env.PATH || '')) {
        return {
            ...env,
            PATH: `${resolve(new Project(cwd).rootPath, 'node_modules/.bin')}${delimiter}${process.env.PATH}`,
        };
    }

    return env;
};

const spawn = async (command, args, options = {}) => {
    const { env, cwd = process.cwd(), stdio = [0, 1, 2], ...p } = options;
    const cp = spawn_(command, args, { ...p, stdio, cwd, env: getEnv(cwd, env) });

    return new Promise((resolve, reject) => {
        cp.on('error', error => {
            cp.removeAllListeners();

            reject(error);
        });

        cp.on('exit', (status, signal) => {
            cp.removeAllListeners();

            if (status) reject(new SpawnError(command, status, signal, cp.pid, args, options));
            else resolve({ status, signal, pid: cp.pid });
        });
    });
};

module.exports = {
    spawn,
};
