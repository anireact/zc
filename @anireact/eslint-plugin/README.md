# @anireact/eslint-plugin

> Custom ESLint rules.

```bash
yarn add -D @anireact/eslint-plugin
```

## Rules

### `@anireact/no-todo`

```javascript
module.exports = {
    ...other,
    rules: {
        ...other.rules,
        '@anireact/no-todo': [
            'error',
            {
                patterns: [{ test: /\bTODO\b/, flags: 'u', name: 'TODO' }],
            },
        ],
    },
};
```

```javascript
// Invalid:
// TODO: Description.
// TODO

// Valid:
// FUTURE: Description.
// Todo: future versions of this plugin will be able to ban malformed todo-comments.
```

## License

MIT
