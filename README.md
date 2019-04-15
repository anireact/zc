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

## Configured tools

-   npm/Yarn:
    -   `.npmignore`.
    -   Painless adding of local dependencies.
-   Git:
    -   `.gitignore`.
    -   `.gitattributes`.
-   [TypeScript](http://www.typescriptlang.org/):
    -   Strict mode.
-   [Babel](https://babeljs.io/):
    -   Presets:
        -   [`env`](https://babeljs.io/docs/en/babel-preset-env).
        -   [`react`](https://babeljs.io/docs/en/babel-preset-react).
        -   [`typescript`](https://babeljs.io/docs/en/babel-preset-typescript).
    -   Plugins:
        -   [`proposal-class-properties`](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties).
        -   [`proposal-export-namespace-from`](https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from).
        -   [`proposal-json-strings`](https://babeljs.io/docs/en/babel-plugin-proposal-json-strings).
        -   [`proposal-numeric-separator`](https://babeljs.io/docs/en/babel-plugin-proposal-numeric-separator).
        -   [`syntax-dynamic-import`](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import).
        -   [`syntax-import-meta`](https://babeljs.io/docs/en/babel-plugin-syntax-import-meta).
        -   [`transform-runtime`](https://babeljs.io/docs/en/babel-plugin-transform-runtime).
        -   [`styled-jsx`](https://github.com/zeit/styled-jsx)
-   [EditorConfig](https://editorconfig.org/):

    | Option                   | All files | Markdown |
    | :----------------------- | :-------- | :------- |
    | Indent style             | `space`   |          |
    | Indent size              | `4`       |          |
    | Tab width                | `4`       |          |
    | End of line              | `lf`      |          |
    | Encoding                 | `utf-8`   |          |
    | Insert final newline     | `true`    |          |
    | Trim trailing whitespace | `true`    | `false`  |
    | Max line length          | `120`     | `80`     |

-   [ESLint](https://eslint.org/):
    -   Both FP- and OOP-friendly config.
    -   `.eslintignore`.
    -   Formatter:
        [`codeframe`](https://github.com/adriantoine/eslint-codeframe-formatter).
    -   Extensions: `*.{js,jsx,ts,tsx}`.
    -   Parsers:
        -   [`babel`](https://github.com/babel/babel-eslint).
        -   [`typescript`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser).
    -   Plugins:
        -   [`array-func`](https://github.com/freaktechnik/eslint-plugin-array-func).
        -   [`babel`](https://github.com/babel/eslint-plugin-babel).
        -   [`eslint-comments`](https://mysticatea.github.io/eslint-plugin-eslint-comments).
        -   [`import`](https://github.com/benmosher/eslint-plugin-import).
        -   [`jest`](https://github.com/jest-community/eslint-plugin-jest).
        -   [`jsx-a11y`](https://github.com/evcohen/eslint-plugin-jsx-a11y).
        -   [`no-use-extend-native`](https://github.com/dustinspecker/eslint-plugin-no-use-extend-native).
        -   [`prettier`](https://github.com/prettier/eslint-plugin-prettier).
        -   [`promise`](https://github.com/xjamundx/eslint-plugin-promise).
        -   [`react`](https://github.com/yannickcr/eslint-plugin-react).
        -   [`sonarjs`](https://github.com/SonarSource/eslint-plugin-sonarjs).
        -   [`@anireact`](https://github.com/anireact/zc/tree/master/@anireact/eslint-plugin).
        -   [`@typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin).
        -   [`@typescript-eslint/tslint`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
            with plugins:
            -   [`microsoft-contrib`](https://github.com/Microsoft/tslint-microsoft-contrib).
            -   [`sonarts`](https://github.com/SonarSource/SonarTS).
-   [Prettier](https://prettier.io/):

    -   `.prettierignore`
    -   Same as EditorConfig; with additional options:

        | Option           | Value          |
        | :--------------- | :------------- |
        | Single quote     | `true`         |
        | JSX single quote | `true`         |
        | Trailing comma   | `'all'`        |
        | Prose wrap       | `'always'`     |
        | Quote props      | `'consistent'` |

-   [commitlint](https://conventional-changelog.github.io/commitlint):
    -   [`conventional`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).
    -   [`lerna-scopes`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-lerna-scopes).
    -   Sentence case with full stop.
-   [husky](https://github.com/typicode/husky):
    -   commitlint on `commit-msg`.
    -   Lint and test on `pre-push`.
-   [rollup](https://rollupjs.org/):
    -   [`babel`](https://github.com/rollup/rollup-plugin-babel).
    -   [`terser`](https://github.com/TrySound/rollup-plugin-terser).
    -   [`gzip`](https://github.com/kryops/rollup-plugin-gzip) with
        [`brotli`](https://github.com/foliojs/brotli.js) and
        [`zopfli`](https://github.com/gfx/universal-zopfli-js).
-   [webpack](https://webpack.js.org):
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
