const { orderCalculator, orderFilter } = require('../helpers');

const getTotalPriceByCustomer = async (customer) => {
  const deliveredOrders = await orderFilter.getDeliveredItemsBy('cliente', customer);
  return orderCalculator.getTotalPrice(deliveredOrders);
};

module.exports = {
  getTotalPriceByCustomer,
};
