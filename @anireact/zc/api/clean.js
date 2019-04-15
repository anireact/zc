const { context, name, print, rimraf, spawn, unicornfig } = require('../shared');

const configure = async () => {
    if (context === 'unknown') throw new Error('Invalid working directory.');

    const zc = (await unicornfig('local')) || {};

    return {
        ...zc,
        title: context === 'project' ? `project root` : name,
    };
};

module.exports = async () => {
    const { build, title } = await configure();

    if (context !== 'project' && !build) return;

    print(`Cleaning ${title}...`, 'yellow', 'bold.yellowBright', 1);

    if (context === 'project') {
        await spawn('lerna', ['exec', '--no-bail', '--concurrency', '1', 'zc', 'clean']);

        return;
    }

    await rimraf('dist');
    await rimraf('./**/*.tsbuildinfo');
    await rimraf('./**/*.log');
};
