const boxen = require('boxen');
const chalk = require('chalk');

const print = (message, border, style, padding) => {
    // eslint-disable-next-line no-console
    return console.log(
        boxen(chalk`{${style || border || 'bold'} ${message}}`, {
            borderColor: border,
            borderStyle: 'round',
            padding,
            margin: 1,
        }),
    );
};

module.exports = {
    print,
};
