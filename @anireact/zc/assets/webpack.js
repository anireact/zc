const { resolve } = require('upath');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const { exists, path, unicornfig } = require('../shared');

const index = resolve(path, 'src', 'index.html');

// NEXT: Bundle analyzer.

module.exports = async () => {
    const html = (await exists(index)) ? [new HtmlWebpackPlugin({ template: index })] : [];

    // eslint-disable-next-line no-magic-numbers
    const { publicPath = '/', port = 1488 } = await unicornfig('local');

    return {
        mode: process.env.NODE_ENV || 'production',
        target: 'web',
        context: path,
        externals: {},
        devtool: 'source-map',
        resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] },
        output: { publicPath },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/iu,
                    use: ['source-map-loader'],
                    enforce: 'pre',
                },
                {
                    test: /\.[jt]sx?$/iu,
                    exclude: /node_modules/iu,
                    use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
                },
                {
                    test: /\.(?:png|jpe?g|gif|svgz?|ttf|otf|eot|woff2?)$/iu,
                    use: [{ loader: 'file-loader', options: { name: '[sha512:hash:base58:8].[ext]' } }],
                },
            ],
        },
        plugins: [new CompressionWebpackPlugin(), ...html],
        devServer: {
            contentBase: resolve(path, '..', 'dist'),
            compress: true,
            host: '0.0.0.0',
            port,
            historyApiFallback: true,
        },
    };
};
