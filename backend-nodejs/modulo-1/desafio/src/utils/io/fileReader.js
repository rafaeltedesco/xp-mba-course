const fs = require('fs/promises');

const readFile = async (path) => {
  try {
    return JSON.parse(await fs.readFile(path, 'utf-8'));
  } catch (error) {
    const err = new Error('Error: cannot read file');
    err.status = 500;
    throw err;
  }
};

module.exports = {
  readFile,
};
