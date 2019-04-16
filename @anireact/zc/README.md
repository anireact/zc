# @anireact/zc

> Zero-config monorepo toolchain.

```bash
yarn global add @anireact/zc
```

## Usage

Create new project:

```bash
cd ~/Projects
zc init 'Project name' 'Project description.'
```

Create new package:

```bash
cd ~/Projects/project-name
yarn zc init 'package-a' 'Package description.'
```

Add local dependency to project root:

```bash
cd ~/Projects/project-name
yarn zc add package-a
```

Add local dependency to specific package:

```bash
cd ~/Projects/project-name/@example-scope/package-b
yarn zc add @example-scope/package-a
```

> You can remove local dependencies as usual, but if required/requiring package
> uses TypeScript, it is recommended to use `yarn zc remove`.

Build everything:

```bash
cd ~/Projects/project-name
yarn zc build
```

> You can lint/fix/clean everything using `lint`/`lint --fix`/`clean` commands.
>
> Also, you can use `build --watch` command to start incremental build; for
> packages built with webpack it will start WDS.

Build specific package:

```bash
cd ~/Projects/project-name/@example-scope/package-a
yarn zc build
```

## Configuration

Global config:

```javascript
// `~/.config/zc/index.js` on Linux.
//
// See https://github.com/kingjan1999/platform-folders `userData`
// for other operating systems.

module.exports = {
    /**
     * Projects location.
     */
    root: '/home/john/Projects',

    /**
     * Available licenses.
     */
    licenses: ['MIT'],

    /**
     * Default author info.
     */
    author: 'John Doe <john@example.com> (https://example.com/john)',

    /**
     * Default scopes for new projects.
     */
    scopes: ['example-scope'],

    /**
     * List of GitHub users/organizations.
     */
    users: ['example-user', 'example-org'],
};
```

Project config:

```jsonc
// Root `package.json`.
{
    // ...other fields
    "zc": {
        /**
         * Available scopes.
         */
        "scopes": ["example-scope"],

        /**
         * Prefer private packages in this project.
         */
        "private": false
    }
}
```

Package config:

```jsonc
// Package’s `package.json`.
{
    "zc": {
        /**
         * Build system:
         *
         * -   `rollup` — for libraries; doesn’t bundle any dependencies.
         * -   `webpack` — for applications; bundles all dependencies.
         * -   `babel` — for CLI tools; just transpiles sources with Babel.
         */
        "build": "rollup",

        /**
         * Allows to customize `publicPath` in webpack builds.
         */
        "publicPath": "/",

        /**
         * Allows to customize WDS port in webpack builds.
         */
        "port": 1488
    }
}
```

## Configs

-   [Babel](https://github.com/anireact/zc/tree/master/@anireact/babel-preset).
-   [Browserslist](https://github.com/anireact/zc/tree/master/@anireact/browserslist-config).
-   [ESLint](https://github.com/anireact/zc/tree/master/@anireact/eslint-config).
-   [husky](https://github.com/anireact/zc/tree/master/@anireact/husky).
-   [commitlint](https://github.com/anireact/zc/tree/master/@anireact/husky#commitlint).
-   [Lerna](https://github.com/anireact/zc/tree/master/@anireact/lerna).
-   [Prettier](https://github.com/anireact/zc/tree/master/@anireact/prettier-config).
-   [EditorConfig](https://github.com/anireact/zc/tree/master/@anireact/prettier-config#editorconfig).
-   [TypeScript](https://github.com/anireact/zc/tree/master/@anireact/typescript).

## Dotfiles

-   `.gitattributes`.
-   `.gitignore`.
-   `.npmignore`.
-   `.eslintignore`.
-   `.prettierignore`

## Build scripts

-   rollup:
    -   [`babel`](https://github.com/rollup/rollup-plugin-babel).
    -   [`terser`](https://github.com/TrySound/rollup-plugin-terser).
    -   [`gzip`](https://github.com/kryops/rollup-plugin-gzip) with
        [`brotli`](https://github.com/foliojs/brotli.js) and
        [`zopfli`](https://github.com/gfx/universal-zopfli-js).
-   webpack:
    -   [`html`](https://github.com/jantimon/html-webpack-plugin) (uses
        `src/index.html` as template when available).
    -   [`compression`](https://github.com/webpack-contrib/compression-webpack-plugin).

## Roadmap

-   [ ] Investigate prose linting for English, Russian, Japanese:
    -   LanguageTool (English, Russian, Japanese).
    -   Hunspell (English, Russian).
    -   Grammarly (English).
    -   Rousseau (English).
    -   Glvrd (Russian).
    -   A3RT (Japanese).
-   [ ] ESLint spellchecker.
    -   Probably with prose linting for non-code comments.
-   [ ] commitlint prose linter.
-   [ ] IDE settings:
    -   Code.
    -   IntelliJ IDEA.
-   [ ] GitHub settings.
-   [ ] Investigate OS-specific trash to ignore.
-   [ ] Keywords.
-   [ ] Shields.
-   [ ] Test on Windows.
-   [ ] TypeDoc.
-   [ ] Analyzer plugins for rollup and webpack.
-   [ ] webpack compression with Brotli/Zopfli.

# License

MIT
