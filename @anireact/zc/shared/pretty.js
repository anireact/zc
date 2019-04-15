const { format, getFileInfo } = require('prettier');
const prettier = require('@anireact/prettier-config');

const { write } = require('./fs');
const { stringify } = require('./stringify');

const pretty = async (to, data, options) => {
    const { inferredParser: parser } = await getFileInfo(to);
    const config = { ...prettier, parser };
    const json = parser.includes('json');
    const object = typeof data === 'object' && !(data instanceof Buffer);
    const w = data => write(to, data, options);

    if (!parser) return w(data);
    if (json && object) return w(format(stringify(data), config));

    return w(format(String(data), config));
};

module.exports = {
    pretty,
};
