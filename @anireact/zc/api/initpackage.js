const dedent = require('dedent');
const { resolve } = require('upath');

const {
    asset,
    choice,
    confirm,
    copy,
    mkdir,
    pretty,
    relink,
    project,
    root,
    spawn,
    unicornfig,
    version: zc,
} = require('../shared');

const extensions = {
    null: 'js',
    babel: 'ts',
    webpack: 'tsx',
    rollup: 'ts',
};

const mains = {
    null: 'index.js',
    babel: 'dist/index.js',
    webpack: 'dist/main.js',
    rollup: 'dist/index.cjs.js',
};

const modules = {
    rollup: 'dist/index.esm.js',
};

const types = {
    babel: 'dist/index.d.ts',
    rollup: 'dist/index.d.ts',
};

const getScope = ({ scope }, { scopes }) => scope || (scopes.length === 1 ? scopes[0] : choice('Scope:', scopes));
const getBuild = ({ build }) => build || choice('Build system:', ['rollup', 'webpack', 'babel', 'none']);
const getHidden = ({ private: p }) => (typeof p === 'boolean' ? p : confirm('Private?', false));

const configure = async argv => {
    const config = await unicornfig('local');
    const { manifest, version } = project;
    const { name, description } = argv;
    const scope = await getScope(argv, config);
    const build = await getBuild(argv);
    const hidden = await getHidden(argv);

    const { license, repository, author } = manifest.toJSON();

    return {
        scope,
        name,
        description,
        version,
        license,
        author,
        repository,
        build: build === 'none' ? null : build || null,
        hidden,
        root,
        fullname: `@${scope}/${name}`,
    };
};

const createScripts = build => {
    if (!build) return undefined;

    return {
        prepublishOnly: 'yarn --silent zc clean && yarn --silent zc build',
    };
};

const createManifest = config => {
    const { fullname, description, version, license, author, repository, build, hidden } = config;

    return {
        author,
        bugs: `https://github.com/${repository}/issues?q=is:issue+label:${fullname}`,
        description,
        homepage: `https://github.com/${repository}/tree/master/${fullname}`,
        license,
        main: mains[build],
        module: modules[build],
        name: fullname,
        private: hidden ? true : undefined,
        publishConfig: hidden ? undefined : { access: 'public' },
        repository,
        scripts: createScripts(build),
        types: types[build],
        version,

        zc: build ? { build } : undefined,

        dependencies: {},
        optionalDependencies: {},
        peerDependencies: {},
        devDependencies: {
            '@anireact/zc': `^${zc}`,
        },
    };
};

const createReadme = config => {
    const { hidden, fullname, description, license } = config;

    // language=Markdown prefix="-   .\n    -   ."
    return dedent`
        # ${fullname}

        > ${description}

        ${
            hidden
                ? ''
                : dedent`
                    \`\`\`
                    yarn add ${fullname}
                    \`\`\`
                `
        }

        # License

        ${license}
    `;
};

module.exports = async argv => {
    const config = await configure(argv);
    const { fullname, root, build } = config;
    const dest = (...xs) => resolve(root, fullname, ...xs);
    const cwd = dest();

    // ↓ Create package directory:
    await mkdir(dest(build ? 'src' : ''));

    // ↓ Create files:
    await Promise.all([
        pretty(dest('package.json'), createManifest(config)), //               ← `package.json`.
        pretty(dest('README.md'), createReadme(config)), //                    ← `README.md`.
        pretty(dest(build ? 'src' : '', `index.${extensions[build]}`), ''), // ← Entry point.
        asset('npm.ignore', dest('.npmignore')), //                            ← `.npmignore`.
        build && asset('typescript.json', dest('tsconfig.json')), //           ← `tsconfig.json`.
        build && asset('common.ignore', dest('.eslintignore')), //             ← `.eslintignore`.
        build && asset('eslint.js', dest('.eslintrc.js')), //                  ← `.eslintrc.js`.
        copy(resolve(root, 'LICENSE'), dest('LICENSE')), //                    ← `LICENSE`.
    ]);

    await Promise.all([
        spawn('git', ['add', './*'], { cwd }),
        spawn('yarn', build ? ['add', '@babel/runtime-corejs3', 'core-js'] : [], { cwd }),
    ]);

    if (build) await relink();
};
