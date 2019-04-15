const { relative, resolve } = require('upath');

const { root } = require('./context');
const { readjson, rimraf } = require('./fs');
const { packages } = require('./packages');
const { pretty } = require('./pretty');
const { print } = require('./print');
const { spawn } = require('./spawn');

const linked = async () => {
    return (await packages()).filter(manifest => {
        const { zc } = manifest.toJSON();

        return zc && zc.build;
    });
};

const relink = async () => {
    print(` Linking TypeScript references. `, 'blue', 'bold.blueBright');

    const list = await linked();

    if (list.length !== 0) {
        const projectTsconfigPath = resolve(root, 'tsconfig.json');
        const projectTsconfig = await readjson(projectTsconfigPath);

        projectTsconfig.references = await Promise.all(
            list.map(async manifest => {
                const { location } = manifest;

                const allDependencies = {
                    ...(manifest.dependencies || {}),
                    ...(manifest.devDependencies || {}),
                    ...(manifest.peerDependencies || {}),
                    ...(manifest.optionalDependencies || {}),
                };

                const dependencyNames = Object.keys(allDependencies);
                const packageTsconfigPath = resolve(location, 'tsconfig.json');
                const packageTsconfig = await readjson(packageTsconfigPath);

                packageTsconfig.references = dependencyNames
                    .map(name => list.find(manifest => manifest.name === name))
                    .filter(Boolean)
                    .map(manifest => ({ path: relative(location, manifest.location) }));

                await pretty(packageTsconfigPath, packageTsconfig);
                await spawn('git', ['add', packageTsconfigPath], { cwd: location });

                return { path: relative(root, location) };
            }),
        );

        await pretty(projectTsconfigPath, projectTsconfig);
        await spawn('git', ['add', projectTsconfigPath], { cwd: root });

        return;
    }

    await rimraf(resolve(root, 'tsconfig.json'));
};

module.exports = {
    linked,
    relink,
};
