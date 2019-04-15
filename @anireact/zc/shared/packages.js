const { project } = require('./context');

const packages = async () => project.getPackages();

module.exports = {
    packages,
};
