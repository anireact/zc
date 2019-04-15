const { gzipAsync: gz } = require('@gfx/zopfli');
const { compress: br } = require('brotli');
const babel = require('rollup-plugin-babel');
const { default: compress } = require('rollup-plugin-gzip');
const { terser } = require('rollup-plugin-terser');
const { dirname, resolve } = require('upath');

const { stat } = require('../shared');

const extensions = ['.tsx', '.ts', '.mjs', '.jsx', '.js', '.json'];

const minify = !process.env.NODE_ENV || process.env.NODE_ENV === 'production';

// NEXT: Better externalizing.
// NEXT: Filesize.
// NEXT: Resolve.
// NEXT: Progress.
// NEXT: Bundle analyzers.

module.exports = {
    external: x => {
        if (x.startsWith('.')) return false;

        return /^[^/]/u.test(x);
    },
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
    ],
    plugins: [
        !minify ? {} : terser(),
        !minify ? {} : compress({ customCompression: content => gz(Buffer.from(content), {}), fileName: '.gz' }),
        !minify ? {} : compress({ customCompression: content => br(Buffer.from(content), {}), fileName: '.br' }),

        babel({ extensions, runtimeHelpers: true, rootMode: 'upward' }),
        {
            // NEXT: Extract to separate plugin.
            resolveId(importee, importer) {
                if (!importer || !importee) return null;

                const dir = dirname(importer);

                const r = async (importee, importer) => {
                    const name = resolve(dir, importee);

                    for (const ext of extensions) {
                        try {
                            const stats = await stat(`${name}${ext}`); // eslint-disable-line no-await-in-loop

                            if (stats.isFile() || stats.isSymbolicLink() || stats.isFIFO()) return `${name}${ext}`;
                        } catch {}
                    }

                    try {
                        if ((await stat(name)).isDirectory()) return r(resolve(dir, importee, 'index'), importer);
                    } catch {}

                    return null;
                };

                return r(importee, importer);
            },
        },
    ],
};
