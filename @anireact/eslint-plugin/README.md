# @anireact/eslint-plugin

> Custom ESLint rules.

```bash
yarn add @anireact/eslint-plugin
```

## Rules

### `@anireact/no-todo`

```javascript
module.exports = {
    ...etc,
    rules: {
        ...etc,
        '@anireact/no-todo': [
            error,
            {
                patterns: [{ test: /\bTODO:/, flags: 'iu', name: 'TODO' }],
            },
        ],
    },
};
```

```javascript
// TODO: Fail.
// Todo: Also fail.

// FUTURE: Pass.
// Future: Also pass.
```

## License

MIT
