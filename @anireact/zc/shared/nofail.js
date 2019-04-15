const nofail = () => {
    const errors = [];

    return {
        push: async promise => {
            try {
                await promise;
            } catch (error) {
                errors.push(error);
            }
        },
        finish: mode => {
            if (mode !== 'silent') for (const error of errors) console.error(error); // eslint-disable-line no-console

            if (errors.length !== 0) process.exit(1); // eslint-disable-line unicorn/no-process-exit
        },
    };
};

module.exports = {
    nofail,
};
