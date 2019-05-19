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
        externals: (context, request, callback) => {
            const native = [
                ...['assert', 'async_hooks', 'child_process', 'cluster', 'crypto', 'dns', 'domain', 'events', 'fs'],
                ...['http', 'http2', 'https', 'inspector', 'net', 'os', 'path', 'perf_hooks', 'process', 'punycode'],
                ...['querystring', 'readline', 'repl', 'stream', 'string_decoder', 'tls', 'trace_events', 'tty'],
                ...['dgram', 'udp4', 'udp6', 'url', 'util', 'v8', 'vm', 'worker_threads', 'zlib'],
                ...['fsevents', 'platform-folders'],
            ];

            return native.includes(request) ? callback(`commonjs ${request}`) : callback();
        },
        devtool: 'source-map',
        resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] },
        output: { publicPath },
        module: {
            rules: [
                { test: /\.[jt]sx?$/iu, use: ['source-map-loader'], enforce: 'pre' },
                { test: /\.[jt]sx?$/iu, exclude: /node_modules/iu, use: [{ loader: 'babel-loader' }] },
                { test: /\.(?:png|jpe?g|gif|svgz?|ttf|otf|eot|woff2?)$/iu, use: [{ loader: 'file-loader' }] },
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
