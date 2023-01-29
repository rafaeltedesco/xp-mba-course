const { ordersRepository } = require('../repository');

const createOrder = async ({ client, product, price }) => ordersRepository
  .createOrder({ client, product, price });

module.exports = {
  createOrder,
};
