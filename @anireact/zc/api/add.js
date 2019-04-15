const { resolve } = require('upath');

const { context, linked, name, packages, path, pretty, print, readjson, relink, root, spawn } = require('../shared');

const configure = async argv => {
    if (context === 'unknown') throw new Error('Invalid working directory.');

    const { dev, peer, optional, names } = argv;

    const list = await packages();

    const newDependencies = list
        .filter(({ name }) => names.includes(name))
        .reduce((newDependencies, { name, version }) => ({ ...newDependencies, [name]: `^${version}` }), {});

    const linkedDependencies = (await linked()).filter(({ name }) => newDependencies[name]);

    return {
        newDependencies,
        key: dev ? 'devDependencies' : peer ? 'peerDependencies' : optional ? 'optionalDependencies' : 'dependencies',
        path: resolve(path, 'package.json'),
        hasLinked: linkedDependencies.length >= 0,
    };
};

module.exports = async argv => {
    const { path, key, newDependencies, hasLinked } = await configure(argv);
    const count = Object.keys(newDependencies).length;
    const targetName = context === 'project' ? 'project root' : name;

    print(
        `Adding ${count} ${count === 1 ? 'dependency' : 'dependencies'} to ${targetName}.`,
        'green',
        'bold.greenBright',
        1,
    );

    const manifest = await readjson(path);

    manifest[key] = { ...(manifest[key] || {}), ...newDependencies };

    await pretty(path, manifest, { style: 'native' });
    await spawn('yarn', [], { cwd: root });

    if (hasLinked) await relink();
};
