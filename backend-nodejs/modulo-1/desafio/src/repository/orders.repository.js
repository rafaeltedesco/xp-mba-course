const config = require('../config/config');
const { fileReader } = require('../utils/io');

const getOrders = async () => fileReader.readFile(config['db-pedidos-path']);

module.exports = {
  getOrders,
};
