const fuzzy = require('fuzzy');
const { prompt, registerPrompt } = require('inquirer');

registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const filter = list => async (answers, input) => {
    return fuzzy.filter(input || '', list).map(({ original }) => original);
};

const autocomplete = (message, list, initial) => {
    return prompt({
        type: 'autocomplete',
        name: 'autocomplete',
        default: initial,
        source: filter(list),
        message,
    }).then(({ autocomplete }) => autocomplete);
};

const choice = (message, choices) => {
    return prompt({
        type: 'list',
        name: 'choice',
        choices,
        message,
    }).then(({ choice }) => choice);
};

const confirm = (message, initial) => {
    return prompt({
        type: 'confirm',
        name: 'confirm',
        default: initial,
        message,
    }).then(({ confirm }) => confirm);
};

const input = (message, initial) => {
    return prompt({
        type: 'input',
        name: 'input',
        default: initial,
        message,
    }).then(({ input }) => input);
};

module.exports = {
    autocomplete,
    choice,
    confirm,
    input,
};
