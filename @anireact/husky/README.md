# @anireact/husky

> Husky config.

```
yarn add -D @anireact/husky
```

`.huskyrc.js`:

```javascript
module.exports = require('@anireact/husky');
```

## Hooks

-   `commit-msg`: commitlint.
-   `pre-push`: build and lint everything.

## commitlint

-   [`conventional`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).
-   [`lerna-scopes`](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-lerna-scopes).
-   Sentence case with full stop.

# License

MIT
