module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
    endOfLine: 'lf',
    proseWrap: 'always',
    quoteProps: 'consistent',
    overrides: [
        {
            files: ['*.md'],
            options: {
                printWidth: 80,
            },
        },
    ],
};
