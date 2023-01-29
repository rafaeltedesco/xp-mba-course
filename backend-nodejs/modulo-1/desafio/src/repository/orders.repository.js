const config = require('../config/config');
const { fileReader, fileWriter } = require('../utils/io');

const save = async (ordersData) => fileWriter.writeFile(config['db-pedidos-path'], ordersData);

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

  await save(ordersData);
  return newOrderData;
};

const orderExists = (orderId, ordersData) => {
  const foundOrderId = ordersData.pedidos.findIndex(({ id }) => +id === +orderId);
  if (foundOrderId === -1) {
    const error = new Error(`Error: order not found with id ${orderId}`);
    error.status = 404;
    throw error;
  }
  return foundOrderId;
};

const updateOrder = async (orderId, {
  client, product, price, delivered,
}) => {
  const ordersData = await getOrders();
  const orderToChangeId = orderExists(orderId, ordersData);
  ordersData.pedidos[orderToChangeId] = {
    ...ordersData.pedidos[orderToChangeId],
    cliente: client,
    produto: product,
    valor: price,
    entregue: delivered,
  };

  await save(ordersData);
};

const updateOrderStatus = async (orderId, deliveryStatus) => {
  const ordersData = await getOrders();
  const orderToChangeId = orderExists(orderId, ordersData);
  ordersData.pedidos[orderToChangeId].entregue = deliveryStatus;

  save(ordersData);
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  updateOrderStatus,
};
