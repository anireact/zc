module.exports = {
    parser: 'babel-eslint',
    extends: '@anireact',
    overrides: [{ files: ['*.ts', '*.tsx'], parserOptions: { tsconfigRootDir: __dirname } }],
};
