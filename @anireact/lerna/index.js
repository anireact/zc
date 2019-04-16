module.exports = {
    npmClient: 'yarn',
    useWorkspaces: true,
    command: {
        version: {
            githubRelease: Boolean(process.env.GH_TOKEN),
            ignoreChanges: [
                'dist/',
                'coverage/',
                'temp/',
                'var/',
                '.eslintignore',
                '.eslintrc.js',
                '*.spec.ts',
                '*.tsbuildinfo',
                '*.log',
            ],
            conventionalCommits: true,
            message: 'chore: Published %s.',
            signGitCommit: true,
            signGitTag: true,
        },
    },
};
