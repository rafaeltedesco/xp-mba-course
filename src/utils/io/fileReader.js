const fs = require('fs/promises');

const readFileAsync = async (path) => fs.readFile(path, 'utf-8');

module.exports = {
    readFileAsync
}