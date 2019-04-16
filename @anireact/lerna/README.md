# @anireact/lerna

> Lerna config.
>
> **NB:** Requires configured GPG.

```
yarn add -DW @anireact/lerna
```

`lerna.json`:

```json
{
    "extends": "@anireact/lerna",
    "version": "1.0.0"
}
```

## Features

-   Uses Yarn.
-   Automatically creates GitHub releases if `GH_TOKEN` available.
-   Ignores changes in tests.
-   Uses conventional commits.
-   Signs commits.

# License

MIT
