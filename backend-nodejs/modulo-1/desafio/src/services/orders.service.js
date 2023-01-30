const { ordersRepository } = require('../repository');

const createOrder = async ({ client, product, price }) => ordersRepository
  .createOrder({ client, product, price });

const updateOrder = async (orderId, {
  client, product, price, delivered,
}) => ordersRepository
  .updateOrder(orderId, {
    client, product, price, delivered,
  });

const updateOrderStatus = async (orderId, deliveryStatus) => {
  if (typeof deliveryStatus !== 'boolean') {
    const error = new Error('Error: delivery status must be of true or false');
    error.status = 400;
    throw error;
  }
  await ordersRepository.updateOrderStatus(orderId, deliveryStatus);
};

const deleteOrder = async (orderId) => ordersRepository.deleteOrder(orderId);

const getOrderById = async (orderId) => {
  const order = await ordersRepository.getOrderById(orderId);
  if (!order) {
    const error = new Error('Error: order not found');
    error.status = 404;
    throw error;
  }
  return order;
};

module.exports = {
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
};
