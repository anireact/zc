const { context, name, nofail, path, print, spawn, unicornfig } = require('../shared');

const lerna = {
    watch: ['lerna', ['exec', '--no-bail', '--concurrency', '1', '--parallel', '--', 'zc', 'build', '--watch']],
    build: ['lerna', ['exec', '--no-bail', '--concurrency', '1', '--', 'zc', 'build']],
};

const tsc = {
    watch: ['tsc', ['--watch']],
    build: ['tsc', []],
};

const rollup = {
    watch: ['rollup', ['--config', require.resolve('../assets/rollup'), '--watch']],
    build: ['rollup', ['--config', require.resolve('../assets/rollup')]],
};

const webpack = {
    watch: ['webpack-dev-server', ['--config', require.resolve('../assets/webpack')]],
    build: ['webpack-cli', ['--config', require.resolve('../assets/webpack')]],
};

const babel = {
    watch: [
        'babel',
        [
            'src',
            '--out-dir',
            'dist',
            '--root-mode',
            'upward',
            '--extensions',
            '.js,.jsx,.ts,.tsx,.mjs',
            '--source-maps',
            '--watch',
        ],
    ],
    build: [
        'babel',
        [
            'src',
            '--out-dir',
            'dist',
            '--root-mode',
            'upward',
            '--extensions',
            '.js,.jsx,.ts,.tsx,.mjs',
            '--source-maps',
        ],
    ],
};

const configure = async argv => {
    if (context === 'unknown') throw new Error('Invalid working directory.');

    const { watch } = argv;
    const zc = (await unicornfig('local')) || {};
    const { push, finish } = nofail();

    return {
        ...zc,
        watch,
        mode: watch ? 'watch' : 'build',
        push: (command, args) => push(spawn(command, args, { cwd: path })),
        finish: mode => finish(mode),
        title: context === 'project' ? `project root` : name,
    };
};

module.exports = async argv => {
    const { build, push, finish, title, mode, watch } = await configure(argv);

    const run = (command, args) => {
        const promise = push(command, args);

        if (watch) return undefined;

        return promise;
    };

    const banner = (...args) => {
        if (!watch) print(...args);
    };

    if (context !== 'project' && !build) return;

    banner(`Building ${title}...`, 'yellow', 'bold.yellowBright', 1);

    if (context === 'project') {
        await spawn(...lerna[mode]);

        return;
    }

    if (build !== 'webpack') {
        banner(` Running TypeScript... `, 'blue', 'bold.blueBright');
        await run(...tsc[mode]);
    }

    if (build === 'rollup') {
        banner(` Running rollup... `, 'red', 'bold.redBright');
        await run(...rollup[mode]);
    } else if (build === 'webpack') {
        banner(` Running webpack... `, 'cyan', 'bold.cyanBright');
        await run(...webpack[mode]);
    } else {
        banner(` Running Babel... `, 'yellow', 'bold.yellowBright');
        await run(...babel[mode]);
    }

    finish('silent');
};
