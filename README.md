# @anireact/zc

> Zero-config monorepo toolchain.

```bash
yarn global add @anireact/zc
```

## Configured tools

-   npm/Yarn:
    -   `.npmignore`.
    -   Painless adding of local dependencies.
-   Git:
    -   `.gitignore`.
    -   `.gitattributes`.
-   TypeScript:
    -   Strict mode.
-   Babel:
    -   Presets:
        -   `env`.
        -   `react`.
        -   `typescript`.
    -   Plugins:
        -   `proposal-class-properties`.
        -   `proposal-export-namespace-from`.
        -   `proposal-json-strings`.
        -   `proposal-numeric-separator`.
        -   `syntax-dynamic-import`.
        -   `syntax-import-meta`.
        -   `transform-runtime`.
        -   `styled-jsx`.
-   EditorConfig:

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

-   ESLint:
    -   Both FP- and OOP-tolerant config.
    -   `.eslintignore`.
    -   Formatter: `codeframe`.
    -   Extensions: `*.{js,jsx,ts,tsx}`.
    -   Parsers:
        -   `babel`.
        -   `typescript`.
    -   Plugins:
        -   `array-func`.
        -   `babel`.
        -   `eslint-comments`.
        -   `import`.
        -   `jest`.
        -   `jsx-a11y`.
        -   `no-use-extend-native`.
        -   `prettier`.
        -   `promise`.
        -   `react`.
        -   `sonarjs`.
        -   `@anireact`.
        -   `@typescript-eslint`.
        -   `@typescript-eslint/tslint` with plugins:
            -   `microsoft-contrib`.
            -   `sonarts`.
-   Prettier:

    -   `.prettierignore`
    -   Same as EditorConfig; with additional options:

        | Option           | Value      |
        | :--------------- | :--------- |
        | Single quote     | `true`     |
        | JSX single quote | `true`     |
        | Trailing comma   | `'all'`    |
        | Prose wrap       | `'always'` |

-   Commitlint:
    -   Conventional.
    -   Lerna scopes.
    -   Sentence case with full stop.
-   Husky:
    -   CommitLint on precommit.
    -   Lint and test on prepush.

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
-   [ ] Commitlint spellchecker.
-   [ ] IDE settings:
    -   Code.
    -   IntelliJ IDEA.
-   [ ] GitHub settings.
-   [ ] Investigate OS-specific trash to ignore.
-   [ ] Keywords.
-   [ ] Shields.
-   [ ] Test on Windows.
-   [ ] TypeDoc.

# License

MIT
