const fs = require('fs/promises');

const readFileAsync = async (path) => {
    return JSON.parse(await fs.readFile(path, 'utf-8'));
}

module.exports = {
    readFileAsync
}