const Project = require('@lerna/project');
const { sync: pkg } = require('pkg-dir');
const { normalize, resolve } = require('upath');

const cwd = normalize(process.cwd());
const raw = pkg(cwd);
const manifest = normalize(raw || cwd);
const project = new Project(cwd);
const root_ = normalize(project.rootPath);

const context = !raw ? 'unknown' : manifest === root_ ? 'project' : 'package';
const path = !raw ? cwd : manifest;
const root = !raw ? cwd : root_;

// eslint-disable-next-line import/no-dynamic-require, global-require
const name = raw && require(resolve(cwd, 'package.json')).name;

module.exports = {
    context,
    cwd,
    name,
    path,
    project,
    root,
};
