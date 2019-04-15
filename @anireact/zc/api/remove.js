const { context, linked, name, path, print, relink, spawn } = require('../shared');

const configure = async argv => {
    if (context === 'unknown') throw new Error('Invalid working directory.');

    const { names } = argv;

    return {
        names,
        hasLinked: (await linked()).filter(manifest => names.some(name => name === manifest.name)).length >= 0,
    };
};

module.exports = async argv => {
    const { names, hasLinked } = await configure(argv);
    const count = names.length;
    const targetName = context === 'project' ? 'project root' : name;

    print(
        `Removing ${count} ${count === 1 ? 'dependency' : 'dependencies'} from ${targetName}.`,
        'green',
        'bold.greenBright',
        1,
    );

    await spawn('yarn', ['remove', ...(context === 'project' ? ['-W'] : []), ...names], { cwd: path });

    if (hasLinked) await relink();
};
