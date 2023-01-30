const { orderCalculator } = require('../helpers');
const { ordersRepository } = require('../repository');

const getTotalPriceByOrderedProduct = async (product) => {
  const orders = (await ordersRepository.getOrders()).pedidos;
  const selectedProductOrders = orders.filter(
    ({ produto }) => produto?.toLowerCase() === product.toLowerCase(),
  );
  const deliveredOrders = selectedProductOrders.filter(
    ({ entregue }) => entregue,
  );
  if (deliveredOrders.length === 0) {
    const error = new Error('Error: Orders Not found for this product');
    error.status = 404;
    throw error;
  }
  return orderCalculator.getTotalPrice(deliveredOrders);
};

module.exports = {
  getTotalPriceByOrderedProduct,
};
