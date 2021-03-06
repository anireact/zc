const join = require('command-join');

module.exports = {
    hooks: {
        'pre-push': 'zc build && zc lint',
        'commit-msg': `commitlint --config ${join(require.resolve('./commitlint'))} -E HUSKY_GIT_PARAMS`,
    },
};
