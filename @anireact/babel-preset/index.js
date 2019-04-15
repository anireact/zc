/*
 eslint
 global-require: off,
 */

module.exports = () => {
    return {
        presets: [
            require('@babel/preset-typescript'),
            [require('@babel/preset-react'), { useBuiltIns: true }],

            [
                require('@babel/preset-env'),
                {
                    shippedProposals: true,
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: '> 0.1%, not dead',
                },
            ],
        ],
        plugins: [
            require('@babel/plugin-syntax-dynamic-import'),
            require('@babel/plugin-proposal-json-strings'),
            require('@babel/plugin-syntax-import-meta'),
            require('@babel/plugin-proposal-export-namespace-from'),
            require('@babel/plugin-proposal-numeric-separator'),

            [require('@babel/plugin-transform-runtime'), { useESModules: 'auto', corejs: 3 }],
            [require('@babel/plugin-proposal-class-properties'), { loose: false }],

            [require('styled-jsx/babel'), { optimizeForSpeed: true, sourceMaps: true, vendorPrefixes: true }],
        ],
    };
};
