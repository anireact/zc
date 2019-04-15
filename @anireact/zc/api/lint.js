const { dirname, resolve } = require('upath');

const { context, exists, name, nofail, path, print, relink, spawn } = require('../shared');

const format = dirname(require.resolve('eslint-codeframe-formatter/package.json'));

const eslint = {
    package: ['--ext', '.js,.ts,.jsx,.tsx', '--format', format, '.'],
    project: ['--ext', '.js', '--format', format, './*.js'],

    lint: [],
    fix: ['--fix'],
};

const prettier = {
    package: ['./**/*.{css,less,scss,html,json,md}'],
    project: ['./*.{css,less,scss,html,json,md}'],

    lint: ['--check'],
    fix: ['--write'],
};

const tsc = {
    lint: ['--noEmit', '--emitDeclarationOnly', 'false'],
    fix: ['--noEmit', '--emitDeclarationOnly', 'false'],
};

const configure = async argv => {
    if (context === 'unknown') throw new Error('Invalid working directory.');

    const { fix } = argv;
    const { push, finish } = nofail();

    return {
        effect: fix ? 'fix' : 'lint',
        fix,
        local: context === 'package',
        typescript: await exists(resolve(path, 'tsconfig.json')),
        push: (command, args) => push(spawn(command, args, { cwd: path })),
        finish: mode => finish(mode),
        title: context === 'project' ? `project root` : name,
    };
};

module.exports = async argv => {
    const { local, typescript, push, effect, finish, title, fix } = await configure(argv);

    print(`${fix ? 'Fix' : 'Lint'}ing ${title}...`, 'yellow', 'bold.yellowBright', 1);

    if (!local && fix) await relink();

    // ↓ Check types, if a package has TypeScript configuration:
    if (local && typescript) {
        if (fix) await relink();

        print(` Running TypeScript... `, 'blue', 'bold.blueBright');
        await push('tsc', tsc[effect]);
    }

    print(` Running ESLint... `, 'cyan', 'bold.cyanBright');
    await push('eslint', [...eslint[effect], ...eslint[context]]);

    print(` Running Prettier... `, 'magenta', 'bold.magentaBright');
    await push('prettier', [...prettier[effect], ...prettier[context]]);

    if (context === 'project')
        await push('lerna', ['--concurrency', '1', 'exec', '--no-bail', '--', 'zc', 'lint', ...(fix ? ['--fix'] : [])]);

    finish('silent');
};
