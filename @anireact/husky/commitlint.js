const off = 0;
const error = 2;

module.exports = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-lerna-scopes'],
    rules: {
        'scope-empty': [off],
        'subject-case': [error, 'always', 'sentence-case'],
        'subject-full-stop': [error, 'always', '.'],
    },
};
