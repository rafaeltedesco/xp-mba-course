const { orderCalculator } = require('../helpers');
const { ordersRepository } = require('../repository');

const getTotalPriceByCustomer = async (customer) => {
  const orders = (await ordersRepository.getOrders()).pedidos;
  const selectedCustomerOrders = orders.filter(({
    cliente,
  }) => cliente?.toLowerCase() === customer.toLowerCase());
  if (selectedCustomerOrders.length === 0) {
    const error = new Error('Error: Orders Not found for this customer');
    error.status = 404;
    throw error;
  }
  const deliveredOrders = selectedCustomerOrders.filter(({ entregue }) => entregue);
  return orderCalculator.getTotalPrice(deliveredOrders);
};

module.exports = {
  getTotalPriceByCustomer,
};
