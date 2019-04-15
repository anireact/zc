const ifempty = (array, fallback) => (Array.isArray(array) && array.length ? array : fallback());

module.exports = {
    ifempty,
};
