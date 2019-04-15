#!/usr/bin/env node

// NEXT: Validate input data.
// NEXT: Handle as most errors as possible.
// NEXT: Configure fail.

const dedent = require('dedent');
const yargs = require('yargs');

const initproject = require('../api/initproject');
const initpackage = require('../api/initpackage');
const lint = require('../api/lint');
const add = require('../api/add');
const remove = require('../api/remove');
const build = require('../api/build');
const clean = require('../api/clean');
const { context } = require('../shared');

void yargs
    .command(
        `init ${'<'}name${'>'} ${'<'}description${'>'}`,
        'Create new project or package.',
        yargs => {
            const usage = yargs
                .usage(
                    dedent`
                        Usage:
                          $0 ${'<'}name${'>'} ${'<'}description${'>'} [...options]

                          Missing options will be prompted interactively. When called from within project directory, creates new package; otherwise, creates new project.

                        Description:
                          Initializes new project or package.
                    `,
                )
                .version(false)
                .help('help', 'Show help.');

            return context === 'unknown'
                ? usage
                      .positional('name', { desc: 'Project name; will be displayed in `README.md`.', type: 'string' })
                      .positional('description', { desc: 'Project description.', type: 'string' })
                      .option('u', { alias: 'user', desc: 'GitHub user/org name.', type: 'string' })
                      .option('r', { alias: 'repo', desc: 'GitHub repo (w/o user/org name).', type: 'string' })
                      .option('s', { alias: 'scopes', desc: 'Scopes of packages.', type: 'array' })
                      .option('a', { alias: 'author', desc: 'Project author.', type: 'string' })
                      .option('l', { alias: 'license', desc: 'SPDX-compatible license identifier.', type: 'string' })
                      .option('v', { alias: 'version', desc: 'Initial version.', type: 'string' })
                      .option('p', { alias: 'private', desc: 'Prefer private packages.', type: 'boolean' })
                : usage
                      .positional('name', { desc: 'Package name.', type: 'string' })
                      .positional('description', { desc: 'Package description.', type: 'string' })
                      .option('s', { alias: 'scope', desc: 'Package scope.', type: 'string' })
                      .option('b', { alias: 'build', desc: 'Build system.', choices: ['rollup', 'webpack', 'none'] })
                      .option('p', { alias: 'private', desc: 'Created project will be private.', type: 'boolean' });
        },
        argv => {
            if (context === 'unknown') return initproject(argv);

            return initpackage(argv);
        },
    )
    .command(
        'lint',
        'Lint project root or package.',
        yargs =>
            yargs
                .usage(
                    dedent`
                        Usage:
                          $0

                          Does not take any parameters. Should be called from within project root directory or package subdirectory. When called from package directory, lints package files; otherwise, lints files in project root.

                        Description:
                          Lints a project root or package. Applies TypeScript, ESLint and Prettier inspections.
                    `,
                )
                .option('f', { alias: 'fix', desc: 'Fix found issues where possible.', type: 'boolean' })
                .version(false)
                .help('help', 'Show help.'),
        lint,
    )
    .command(
        'add [names..]',
        'Add local dependency to project root or package.',
        yargs =>
            yargs
                .usage(
                    dedent`
                        Usage:
                          $0 [option] [names..]

                          Should be called from within project root directory or package subdirectory. When called from package directory, adds dependency to current package; otherwise, adds to project root.

                        Description:
                          Installs local dependency to project root or package.

                        Positionals:
                          names  Local dependency names; external dependencies will be ignored.
                    `,
                )
                .option('D', { alias: 'dev', desc: 'Save as dev-dependency.', type: 'boolean' })
                .option('P', { alias: 'peer', desc: 'Save as peer-dependency.', type: 'boolean' })
                .option('O', { alias: 'optional', desc: 'Save as opt-dependency.', type: 'boolean' })
                .conflicts('D', ['O', 'P'])
                .conflicts('P', ['D', 'O'])
                .conflicts('O', ['P', 'D'])
                .version(false)
                .help('help', 'Show help.'),
        add,
    )
    .command(
        'remove [names..]',
        'Remove local dependency from project root or package.',
        yargs =>
            yargs
                .usage(
                    dedent`
                        Usage:
                          $0 [names..]

                          Should be called from within project root directory or package subdirectory. When called from package directory, removes dependency from current package; otherwise, removes from project root.

                        Description:
                          Installs local dependency to project root or package.

                        Positionals:
                          names  Dependency names.
                    `,
                )
                .version(false)
                .help('help', 'Show help.'),
        remove,
    )
    .command(
        'build',
        'Build specific package or whole project.',
        yargs =>
            yargs
                .usage(
                    dedent`
                        Usage:
                          $0 [option]
        
                          Should be called from within project root directory or package subdirectory. When called from specific package directory, builds this package, otherwise builds all packages in project.
        
                        Description:
                          Builds specific package or whole project.
                    `,
                )
                .option('w', { alias: 'watch', desc: 'Run in watch mode.', type: 'boolean' })
                .version(false)
                .help('help', 'Show help.'),
        build,
    )
    .command(
        'clean',
        'Clean build artifacts and temporary files.',
        yargs =>
            yargs
                .usage(
                    dedent`
                        Usage:
                          $0
        
                          Should be called from within project root directory or package subdirectory. When called from specific package directory, cleans this package, otherwise cleans all packages in project.
        
                        Description:
                          Cleans specific package or whole project.
                    `,
                )
                .version(false)
                .help('help', 'Show help.'),
        clean,
    )
    .help('help', 'Show help.').argv;
