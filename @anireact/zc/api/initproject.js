const dedent = require('dedent');
const spdx = require('spdx-license-ids');
const { join, resolve } = require('upath');

const {
    asset,
    autocomplete,
    confirm,
    cwd,
    ifempty,
    input,
    mkdir,
    pretty,
    print,
    spawn,
    unicornfig,
    version: zc,
} = require('../shared');

const getUser = ({ user }, { users }) => user || autocomplete('GitHub user/org name:', users);
const getRepo = ({ repo }) => repo || input('GitHub repo (w/o user/org name):');

const getScopes = ({ scopes: s }, { scopes }) =>
    ifempty(s, () => input('Scopes of packages:', scopes.join(' ')).then(scopes => scopes.split(/ +/gu)));

const getAuthor = ({ author: a }, { author }) => a || input('Project author:', author);
const getLicense = ({ license: l }, { licenses = [] }) => l || autocomplete('License:', ifempty(licenses, () => spdx));
const getVersion = ({ version: v }) => v || input('Initial version:', '1.0.0');
const getHidden = ({ private: p }) => (typeof p === 'boolean' ? p : confirm('Prefer private?', false));
const getDirectory = ({ root }, repo) => join(root || cwd, repo);

const configure = async argv => {
    const config = await unicornfig('global');
    const { name, description } = argv;

    const user = await getUser(argv, config);
    const repo = await getRepo(argv);

    return {
        name,
        description,
        fullname: `${user}/${repo}`,
        directory: getDirectory(config, repo),
        scopes: await getScopes(argv, config),
        author: await getAuthor(argv, config),
        license: await getLicense(argv, config),
        version: await getVersion(argv),
        hidden: await getHidden(argv),
    };
};

const createManifest = config => {
    const { author, license, fullname, scopes, name, description, hidden } = config;

    return {
        author,
        bugs: `https://github.com/${fullname}/issues`,
        description,
        homepage: `https://github.com/${fullname}`,
        license,
        name,
        private: true,
        repository: fullname,
        workspaces: scopes.map(scope => `@${scope}/*`),

        browserslist: ['extends @anireact/browserslist-config'],
        eslintConfig: { extends: '@anireact', parser: 'babel-eslint' },
        prettier: '@anireact/prettier-config',
        zc: { scopes, private: hidden },

        devDependencies: {
            '@anireact/zc': `^${zc}`,
        },
    };
};

const createReadme = config => {
    const { name, description, license } = config;

    // language=Markdown prefix="-   .\n    -   ."
    return dedent`
        # ${name}

        > ${description}

        # License

        ${license}
    `;
};

const createLerna = config => {
    const { version } = config;

    return {
        extends: '@anireact/lerna',
        version,
    };
};

const finish = async (config, manifest) => {
    const { directory, fullname, version } = config;

    const dest = (...xs) => resolve(directory, ...xs);
    const run = (command, args) => spawn(command, args, { cwd: dest() });

    print(' Installing dependencies... ', 'blue', 'bold.blueBright');
    await run('yarn', []);

    await pretty(dest('package.json'), { ...manifest, lerna: { extends: '@anireact/lerna', version } });

    print(' Initializing Git... ', 'red', 'bold.redBright');
    await run('git', ['init']);
    await run('git', ['remote', 'add', 'origin', `git@github.com:${fullname}.git`]);
    await run('git', ['add', './*']);
    await run('git', ['commit', '-m', 'chore: Initial commit.']);
};

module.exports = async argv => {
    const config = await configure(argv);
    const { directory, scopes } = config;
    const dest = (...xs) => resolve(directory, ...xs);

    print(`Initializing project...`, 'yellow', 'bold.yellowBright', 1);

    print(' Creating files... ', 'cyan', 'bold.cyanBright');

    // ↓ Create project directory:
    await mkdir(directory);

    const manifest = createManifest(config);

    await Promise.all([
        pretty(dest('package.json'), manifest), //          ← `package.json`.
        pretty(dest('README.md'), createReadme(config)), // ← `README.md`.
        asset('common.ignore', dest('.eslintignore')), //   ← `.eslintignore`.
        asset('common.ignore', dest('.gitignore')), //      ← `.gitignore`.
        asset('gitattributes', dest('.gitattributes')), //  ← `.gitattributes`.
        asset('editorconfig', dest('.editorconfig')), //    ← `.editorconfig`.
        asset('husky.js', dest('.huskyrc.js')), //          ← `.huskyrc.js`.
        asset('babel.js', dest('babel.config.js')), //      ← `babel.config.js`.

        ...scopes.map(scope => mkdir(dest(`@${scope}`))),
    ]);

    await finish(config, manifest);
    await pretty(dest('lerna.json'), createLerna(config)); // ← Create `lerna.json`.

    print(' Then create `LICENSE` file in the project root. ');
};
