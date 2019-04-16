# @anireact/prettier-config

> Prettier config.

```
yarn add -D @anireact/prettier-config
```

`package.json`:

```jsonc
{
    // ...other
    "prettier": "@anireact/prettier-config"
}
```

## EditorConfig

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

## Prettier-specific options

| Option           | Value          |
| :--------------- | :------------- |
| Single quote     | `true`         |
| JSX single quote | `true`         |
| Trailing comma   | `'all'`        |
| Prose wrap       | `'always'`     |
| Quote props      | `'consistent'` |

# License

MIT
