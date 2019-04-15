const astUtils = require('eslint/lib/util/ast-utils');

const format = name => `Unexpected \`'${name}'\` comment.`;

module.exports = {
    create(context) {
        const tree = context.getSourceCode();
        const [{ patterns = [] }] = context.options || {};

        const tests = patterns.map(({ test, flags = 'mu', name = test }) => {
            return {
                name,
                test: value => new RegExp(test, flags).test(value),
            };
        });

        return {
            Program() {
                const comments = tree.getAllComments();

                comments
                    .filter(token => token.type !== 'Shebang' && !astUtils.isDirectiveComment(token))
                    .forEach(node => {
                        tests
                            .filter(({ test }) => test(node.value))
                            .forEach(({ name }) => context.report({ node, message: format(name) }));
                    });
            },
        };
    },
};
