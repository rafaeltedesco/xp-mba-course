const fs = require('fs/promises');

const writeFile = async (path, data) => {
  try {
    await fs.writeFile(path, JSON.stringify(data, null, 4));
  } catch (err) {
    const error = new Error('Error: cannot write to file');
    error.status = 500;
    throw error;
  }
};

module.exports = {
  writeFile,
};
