const { dirname, resolve } = require('upath');

const off = 'off';
const error = 'error';
const cwd = process.cwd();

module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        babelOptions: {
            rootMode: 'upward',
        },
    },
    plugins: [
        'babel',
        'import',
        'prettier',
        'unicorn',
        'react',
        'jsx-a11y',
        'array-func',
        'promise',
        'jest',
        'sonarjs',
        'no-use-extend-native',
        'eslint-comments',
        '@anireact',
        '@typescript-eslint',
        '@typescript-eslint/tslint',
    ],
    extends: ['plugin:jsx-a11y/recommended'],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.json'],
        'import/ignore': [
            'css',
            'html',
            'less',
            'md',
            'sh',
            'svg',
            'txt',
            'xml',
            'eot',
            'gif',
            'ico',
            'jpeg',
            'midi',
            'mp3',
            'mp4',
            'ogg',
            'otf',
            'pdf',
            'png',
            'svgz',
            'ttf',
            'webm',
            'webp',
            'woff',
            'woff2',
            '7z',
            'br',
            'gz',
            'tar',
            'zip',
        ],
        'react': {
            pragma: 'createElement',
            version: 'detect',
        },
    },
    rules: {
        // region
        'no-async-promise-executor': error,
        'no-await-in-loop': error,
        'no-compare-neg-zero': error,
        'no-cond-assign': error,
        'no-console': error,
        'no-constant-condition': error,
        'no-debugger': error,
        'no-empty': [error, { allowEmptyCatch: true }],
        'no-empty-character-class': error,
        'no-ex-assign': error,
        'no-func-assign': error,
        'no-inner-declarations': [error, 'both'],
        'no-invalid-regexp': error,
        'no-irregular-whitespace': [
            error,
            {
                skipStrings: false,
                skipComments: false,
                skipRegExps: false,
                skipTemplates: false,
            },
        ],
        'no-misleading-character-class': error,
        'no-prototype-builtins': error,
        'no-unreachable': error,
        'no-unsafe-finally': error,
        'no-unsafe-negation': error,
        'require-atomic-updates': error,
        'use-isnan': error,
        // endregion

        // region
        'block-scoped-var': error,
        'class-methods-use-this': error,
        'complexity': error,
        'default-case': error,
        'dot-notation': error,
        'eqeqeq': error,
        'guard-for-in': error,
        'no-alert': error,
        'no-caller': error,
        'no-case-declarations': error,
        'no-else-return': error,
        'no-empty-function': error,
        'no-empty-pattern': error,
        'no-eq-null': error,
        'no-eval': error,
        'no-extra-label': error,
        'no-implicit-coercion': error,
        'no-implicit-globals': error,
        'no-implied-eval': error,
        'no-labels': error,
        'no-lone-blocks': error,
        'no-loop-func': error,
        'no-magic-numbers': [
            error,
            {
                ignore: [-2, -1, 0, 1, 2, 0xff, 0xffff, 0xffffffff],
                ignoreArrayIndexes: true,
                enforceConst: true,
            },
        ],
        'no-new': error,
        'no-new-func': error,
        'no-new-wrappers': error,
        'no-octal': error,
        'no-octal-escape': error,
        'no-param-reassign': error,
        'no-redeclare': error,
        'no-return-assign': error,
        'no-return-await': error,
        'no-script-url': error,
        'no-self-assign': error,
        'no-self-compare': error,
        'no-sequences': error,
        'no-throw-literal': error,
        'no-unmodified-loop-condition': error,
        'no-unused-labels': error,
        'no-useless-catch': error,
        'no-useless-concat': error,
        'no-useless-escape': error,
        'no-useless-return': error,
        'no-with': error,
        'prefer-named-capture-group': error,
        'prefer-promise-reject-errors': error,
        'yoda': error,
        // endregion

        // region
        'no-delete-var': error,
        'no-label-var': error,

        'callback-return': error,
        'handle-callback-err': error,
        'no-restricted-modules': [error, { paths: [{ name: 'path', message: 'Use `upath` instead.' }] }],
        'no-sync': error,
        // endregion

        // region
        'func-name-matching': error,
        'func-names': [error, 'as-needed'],
        'lines-between-class-members': [error, 'always', { exceptAfterSingleLine: true }],
        'max-depth': error,
        'max-lines-per-function': error,
        'max-nested-callbacks': error,
        'max-params': [error, 6], // eslint-disable-line no-magic-numbers
        'max-statements': [error, 20], // eslint-disable-line no-magic-numbers
        'no-array-constructor': error,
        'no-lonely-if': error,
        'no-multi-assign': error,
        'no-new-object': error,
        'no-unneeded-ternary': error,
        'one-var': [error, 'never'],
        'padding-line-between-statements': [
            error,
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'block-like',
                    'break',
                    'cjs-import',
                    'const',
                    'continue',
                    'debugger',
                    'import',
                    'let',
                    'multiline-expression',
                    'return',
                    'throw',
                    'var',
                ],
            },
            {
                blankLine: 'always',
                prev: [
                    'block-like',
                    'break',
                    'cjs-import',
                    'const',
                    'continue',
                    'debugger',
                    'import',
                    'let',
                    'multiline-expression',
                    'return',
                    'throw',
                    'var',
                ],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: ['cjs-import', 'const', 'import', 'let', 'var'],
                next: ['cjs-import', 'const', 'import', 'let', 'var'],
            },
        ],
        'prefer-object-spread': error,
        'spaced-comment': error,
        // endregion

        // region
        'no-class-assign': error,
        'no-restricted-imports': [error, { paths: [{ name: 'path', message: 'Use `upath` instead.' }] }],
        'no-useless-computed-key': error,
        'no-useless-rename': error,
        'no-var': error,
        'object-shorthand': error,
        'prefer-arrow-callback': error,
        'prefer-const': error,
        'prefer-destructuring': error,
        'prefer-numeric-literals': error,
        'prefer-rest-params': error,
        'prefer-template': error,
        'require-yield': error,
        'symbol-description': error,
        // endregion

        // region
        'babel/no-unused-expressions': error,

        'prettier/prettier': [error, require('@anireact/prettier-config'), { usePrettierrc: false }], // eslint-disable-line global-require

        'unicorn/catch-error-name': [error, { name: 'error' }],
        'unicorn/no-process-exit': error,
        'unicorn/throw-new-error': error,
        'unicorn/no-array-instanceof': error,
        'unicorn/no-hex-escape': error,
        'unicorn/custom-error-definition': error, // Q: What about class properties support?
        'unicorn/prefer-starts-ends-with': error,
        'unicorn/prefer-type-error': error,
        'unicorn/regex-shorthand': error,
        'unicorn/error-message': error,
        'unicorn/prefer-add-event-listener': error,
        'unicorn/prefer-exponentiation-operator': error,
        'unicorn/no-console-spaces': error,
        'unicorn/prefer-node-append': error,
        'unicorn/prefer-query-selector': error,
        'unicorn/prefer-node-remove': error,
        'unicorn/prefer-text-content': error,
        'unicorn/no-for-loop': error,
        'unicorn/prefer-includes': error,

        'eslint-comments/disable-enable-pair': [error, { allowWholeFile: true }],
        'eslint-comments/no-aggregating-enable': error,
        'eslint-comments/no-duplicate-disable': error,
        'eslint-comments/no-unlimited-disable': error,
        'eslint-comments/no-unused-disable': error,
        'eslint-comments/no-unused-enable': error,
        // endregion

        // region
        'import/no-absolute-path': error,
        'import/no-dynamic-require': error,
        'import/no-self-import': error,
        'import/no-cycle': error,
        'import/no-useless-path-segments': error,
        'import/no-named-as-default': error,
        'import/no-extraneous-dependencies': error,
        'import/no-mutable-exports': error,
        'import/first': error,
        'import/exports-last': error,
        'import/no-duplicates': error,
        'import/extensions': [
            error,
            {
                'js': 'never',
                'jsx': 'never',
                'ts': 'never',
                'tsx': 'never',

                'json': 'ignorePackages',

                'css': 'always',
                'html': 'always',
                'less': 'always',
                'md': 'always',
                'sh': 'always',
                'svg': 'always',
                'txt': 'always',
                'xml': 'always',

                'eot': 'always',
                'gif': 'always',
                'ico': 'always',
                'jpeg': 'always',
                'midi': 'always',
                'mp3': 'always',
                'mp4': 'always',
                'ogg': 'always',
                'otf': 'always',
                'pdf': 'always',
                'png': 'always',
                'svgz': 'always',
                'ttf': 'always',
                'webm': 'always',
                'webp': 'always',
                'woff': 'always',
                'woff2': 'always',

                '7z': 'always',
                'br': 'always',
                'gz': 'always',
                'tar': 'always',
                'zip': 'always',
            },
        ],
        'import/order': [error, { 'newlines-between': 'always' }],
        'import/newline-after-import': error,
        'import/no-deprecated': error,
        'import/no-unassigned-import': error,
        'import/no-named-default': error,
        'import/no-default-export': error,
        // endregion

        // region
        'react/button-has-type': error,
        'react/no-access-state-in-setstate': error,
        'react/no-array-index-key': error,
        'react/no-children-prop': error,
        'react/no-danger': error,
        'react/no-danger-with-children': error,
        'react/no-deprecated': error,
        'react/no-did-mount-set-state': error,
        'react/no-did-update-set-state': error,
        'react/no-direct-mutation-state': error,
        'react/no-redundant-should-component-update': error,
        'react/no-string-refs': error,
        'react/no-unescaped-entities': error,
        'react/no-unsafe': error,
        'react/no-will-update-set-state': error,
        'react/prefer-stateless-function': error,
        'react/react-in-jsx-scope': error,
        'react/void-dom-elements-no-children': error,

        'react/jsx-no-bind': error,
        'react/jsx-no-literals': [error, { noStrings: true }],
        'react/jsx-no-target-blank': error,
        'react/jsx-fragments': [error, 'syntax'],
        'react/jsx-sort-props': [error, { callbacksLast: true, shorthandFirst: true, reservedFirst: true }],
        'react/jsx-uses-react': error,
        'react/jsx-uses-vars': error,

        'array-func/from-map': error,
        'array-func/no-unnecessary-this-arg': error,
        'array-func/prefer-array-from': error,
        'array-func/prefer-flat-map': error,
        'array-func/prefer-flat': error,

        'promise/catch-or-return': error,
        'promise/no-return-wrap': error,
        'promise/param-names': error,
        'promise/always-return': error,
        'promise/no-nesting': error,
        'promise/no-promise-in-callback': error,
        'promise/no-callback-in-promise': error,
        'promise/no-return-in-finally': error,

        'sonarjs/prefer-object-literal': error,
        'sonarjs/prefer-single-boolean-return': error,
        'sonarjs/prefer-while': error,
        // endregion

        // region
        '@anireact/no-todo': [
            error,
            {
                patterns: [
                    { flags: 'u', test: /\bTODO\b/u, name: 'TODO' },
                    { flags: 'u', test: /\bFIX(?:IT|ME)?\b/u, name: 'FIXME' },
                    { flags: 'u', test: /\bBUG\b/u, name: 'BUG' },
                    { flags: 'u', test: /\bCRIT(?:ICAL)?\b/u, name: 'CRITICAL' },
                    { flags: 'u', test: /\bASAP\b/u, name: 'ASAP' },
                    { flags: 'u', test: /\bBLOCK(?!ED)(?:ER)?\b/u, name: 'BLOCKER' },
                ],
            },
        ],
        // endregion
    },
    overrides: [
        {
            files: ['*.js', '*.jsx'],
            env: {
                es6: true,
                commonjs: true,
                node: true,
            },
            rules: {
                // region
                'getter-return': error,
                'no-dupe-args': error,
                'no-dupe-keys': error,
                'no-duplicate-case': error,
                'no-obj-calls': error,
                'no-sparse-arrays': error,

                'array-callback-return': error,
                'consistent-return': error,
                'no-extend-native': error,
                'no-fallthrough': error,
                'no-global-assign': error,
                'no-iterator': error,
                'no-proto': error,

                'init-declarations': error,
                'no-undef': error,
                'no-unused-vars': error,
                'no-use-before-define': error,

                'global-require': error,
                'no-buffer-constructor': error,
                'no-mixed-requires': error,
                'no-new-require': error,

                'new-cap': error,
                'no-bitwise': error,

                'constructor-super': error,
                'no-const-assign': error,
                'no-dupe-class-members': error,
                'no-new-symbol': error,
                'no-this-before-super': error,
                // endregion

                // region
                'babel/camelcase': error,
                'babel/new-cap': error,
                'babel/no-invalid-this': error,
                'babel/valid-typeof': error,

                'import/no-unresolved': error,
                'import/named': error,
                'import/default': error,
                'import/namespace': error,
                'import/no-webpack-loader-syntax': error,
                'import/export': error,
                'import/no-named-as-default-member': error,

                'unicorn/new-for-builtins': error,
                'unicorn/no-unused-properties': error,

                'react/no-typos': error,
                'react/no-this-in-sfc': error,
                'react/no-unknown-property': error,
                'react/require-render-return': error,
                // BLOCKED: 'react/state-in-constructor': error,
                'react/style-prop-object': error,

                'react/jsx-key': error,
                'react/jsx-no-duplicate-props': error,

                'array-func/avoid-reverse': error,

                'no-use-extend-native/no-use-extend-native': error,

                'promise/no-new-statics': error,
                'promise/valid-params': error,

                'sonarjs/no-all-duplicated-branches': error,
                'sonarjs/no-element-overwrite': error,
                'sonarjs/no-extra-arguments': error,
                'sonarjs/no-identical-conditions': error,
                'sonarjs/no-identical-expressions': error,
                'sonarjs/no-one-iteration-loop': error,
                'sonarjs/no-use-of-empty-return-value': error,
                'sonarjs/cognitive-complexity': error,
                'sonarjs/no-duplicated-branches': error,
                'sonarjs/no-identical-functions': error,
                'sonarjs/no-inverted-boolean-check': error,
                'sonarjs/no-redundant-boolean': error,
                'sonarjs/no-small-switch': error,
                'sonarjs/prefer-immediate-return': error,
                // endregion
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: cwd,
            },
            rules: {
                // region
                '@typescript-eslint/adjacent-overload-signatures': error,
                '@typescript-eslint/array-type': [error, 'array-simple'],
                '@typescript-eslint/ban-ts-ignore': error,
                '@typescript-eslint/camelcase': error,
                '@typescript-eslint/class-name-casing': error,
                '@typescript-eslint/generic-type-naming': [error, '^[a-z]$'],
                '@typescript-eslint/member-ordering': [
                    error,
                    {
                        default: [
                            'private-static-field',
                            'protected-static-field',
                            'public-static-field',
                            'private-static-method',
                            'protected-static-method',
                            'public-static-method',
                            'private-instance-field',
                            'protected-instance-field',
                            'public-instance-field',
                            'constructor',
                            'private-instance-method',
                            'protected-instance-method',
                            'public-instance-method',
                        ],
                    },
                ],
                '@typescript-eslint/no-angle-bracket-type-assertion': error,
                '@typescript-eslint/no-empty-interface': error,
                '@typescript-eslint/no-explicit-any': error,
                '@typescript-eslint/no-extraneous-class': error,
                '@typescript-eslint/no-misused-new': error,
                '@typescript-eslint/no-namespace': error,
                '@typescript-eslint/no-non-null-assertion': error,
                '@typescript-eslint/no-require-imports': error,
                '@typescript-eslint/no-this-alias': error,
                '@typescript-eslint/no-triple-slash-reference': error,
                '@typescript-eslint/no-useless-constructor': error,
                '@typescript-eslint/no-var-requires': error,
                '@typescript-eslint/prefer-function-type': error,
                '@typescript-eslint/prefer-interface': error,
                '@typescript-eslint/prefer-namespace-keyword': error,
                '@typescript-eslint/unified-signatures': error,
                // endregion

                '@typescript-eslint/tslint/config': [
                    error,
                    {
                        rulesDirectory: [
                            resolve(dirname(require.resolve('tslint-sonarts/package.json')), 'lib', 'rules'),
                            dirname(require.resolve('tslint-microsoft-contrib/package.json')),
                        ],
                        rules: {
                            'no-unnecessary-type-assertion': true,
                            'promise-function-async': true,
                            'await-promise': true,
                            'no-floating-promises': true,
                            'no-for-in-array': true,
                            'no-inferred-empty-object-type': true,
                            'no-unbound-method': true,
                            'no-unsafe-any': true,
                            'no-use-before-declare': true,
                            'no-void-expression': true,
                            'restrict-plus-operands': true,
                            'strict-type-predicates': true,
                            'use-default-type-parameter': true,
                            'deprecation': true,
                            'prefer-readonly': true,
                            'no-boolean-literal-compare': true,
                            'no-unnecessary-qualifier': true,
                            'return-undefined': true,
                            'unnecessary-bind': true,

                            'no-all-duplicated-branches': true,
                            'no-case-with-or': true,
                            'no-collection-size-mischeck': true,
                            'no-element-overwrite': true,
                            'no-empty-array': true,
                            'no-identical-conditions': true,
                            'no-identical-expressions': true,
                            'no-ignored-initial-value': true,
                            'no-ignored-return': true,
                            'no-misleading-array-reverse': true,
                            'no-misspelled-operator': true,
                            'no-self-assignment': true,
                            'no-try-promise': true,
                            'no-unthrown-error': true,
                            'no-use-of-empty-return-value': true,
                            'no-useless-increment': true,
                            'no-useless-intersection': true,

                            'arguments-order': true,
                            'bool-param-default': true,
                            'cognitive-complexity': true,
                            'no-alphabetical-sort': true,
                            'no-array-delete': true,
                            'no-collapsible-if': true,
                            'no-commented-code': true,
                            'no-dead-store': true,
                            'no-duplicate-in-composite': true,
                            'no-duplicated-branches': true,
                            'no-gratuitous-expressions': true,
                            'no-hardcoded-credentials': true,
                            'no-identical-functions': true,
                            'no-invariant-return': true,
                            'no-inverted-boolean-check': true,
                            'no-nested-incdec': true,
                            'no-nested-switch': true,
                            'no-redundant-boolean': true,
                            'no-redundant-jump': true,
                            'no-return-type-any': true,
                            'no-small-switch': true,
                            'no-unconditional-jump': true,
                            'no-unused-array': true,
                            'prefer-immediate-return': true,
                            'prefer-promise-shorthand': true,
                            'prefer-type-guard': true,
                            'use-primitive-type': true,

                            'possible-timing-attack': true,
                            'promise-must-complete': true,
                            'no-inner-html': true,
                            'no-document-write': true,
                        },
                    },
                ],
            },
        },
        {
            files: ['*.spec.{ts,js,tsx,jsx}'],
            rules: {
                'jest/consistent-test-it': [error, { fn: 'test' }],
                'jest/expect-expect': error,
                'jest/no-disabled-tests': error,
                'jest/no-empty-title': error,
                'jest/no-focused-tests': error,
                'jest/no-identical-title': error,
                'jest/no-test-prefixes': error,
                'jest/no-test-return-statement': error,
                'jest/prefer-to-be-null': error,
                'jest/prefer-to-be-undefined': error,
                'jest/prefer-to-contain': error,
                'jest/prefer-to-have-length': error,
                'jest/valid-describe': error,
                'jest/valid-expect-in-promise': error,
                'jest/valid-expect': error,
                'jest/prefer-todo': error,

                'no-magic-numbers': off,
            },
        },
    ],
};
