const config = require('../config/config');
const { fileReader, fileWriter } = require('../utils/io');

const getOrders = async () => fileReader.readFile(config['db-pedidos-path']);

const createOrder = async ({ client, product, price }) => {
  const ordersData = await getOrders();
  const newOrderData = {
    id: ordersData.nextId++,
    cliente: client,
    produto: product,
    valor: price,
    entregue: false,
    timestamp: new Date(),
  };
  ordersData.pedidos.push(newOrderData);
  await fileWriter.writeFile(config['db-pedidos-path'], ordersData);
  return newOrderData;
};

module.exports = {
  getOrders,
  createOrder,
};
