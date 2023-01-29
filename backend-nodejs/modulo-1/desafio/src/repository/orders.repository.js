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

const updateOrder = async (orderId, { client, product, price, delivered}) => {
  const ordersData = await getOrders();
  const orderToChangeId = ordersData.pedidos.findIndex(({ id }) => +id === +orderId);
  if (orderToChangeId === -1) {
    const error = new Error(`Error: order not found with id ${orderId}`);
    error.status = 404;
    throw error;
  }
  ordersData.pedidos[orderToChangeId] = {
    ...ordersData.pedidos[orderToChangeId],
    cliente: client,
    produto: product,
    valor: price,
    entregue: delivered,
  };

  await fileWriter.writeFile(config['db-pedidos-path'], ordersData);
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
};
