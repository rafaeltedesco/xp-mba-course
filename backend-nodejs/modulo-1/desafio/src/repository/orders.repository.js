const config = require('../config/config');
const { fileReader, fileWriter } = require('../utils/io');

const save = async (ordersData) => fileWriter.writeFile(config['db-pedidos-path'], ordersData);

const getOrders = async () => fileReader.readFile(config['db-pedidos-path']);

const createOrder = async ({ customer, product, price }) => {
  const ordersData = await getOrders();
  const newOrderData = {
    id: ordersData.nextId++,
    cliente: customer,
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
  customer, product, price, delivered,
}) => {
  const ordersData = await getOrders();
  const orderToChangeId = orderExists(orderId, ordersData);
  ordersData.pedidos[orderToChangeId] = {
    ...ordersData.pedidos[orderToChangeId],
    cliente: customer,
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

  await save(ordersData);
};

const deleteOrder = async (orderId) => {
  const ordersData = await getOrders();
  const orderIdToRemove = orderExists(orderId, ordersData);
  ordersData.pedidos.splice(orderIdToRemove, 1);

  await save(ordersData);
};

const getOrderById = async (orderId) => {
  const orders = (await getOrders()).pedidos;
  const order = orders.find(({ id }) => +id === +orderId);
  return order || null;
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
};
