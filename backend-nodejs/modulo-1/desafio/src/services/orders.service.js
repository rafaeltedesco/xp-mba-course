const { ordersRepository } = require('../repository');

const createOrder = async ({ client, product, price }) => ordersRepository
  .createOrder({ client, product, price });

const updateOrder = async (orderId, {
  client, product, price, delivered,
}) => ordersRepository
  .updateOrder(orderId, {
    client, product, price, delivered,
  });

module.exports = {
  createOrder,
  updateOrder,
};
