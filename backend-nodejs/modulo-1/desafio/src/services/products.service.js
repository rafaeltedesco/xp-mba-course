const { orderCalculator, orderFilter } = require('../helpers');

const getTotalPriceByOrderedProduct = async (product) => {
  const deliveredOrders = await orderFilter.getDeliveredItemsBy('produto', product);
  return orderCalculator.getTotalPrice(deliveredOrders);
};

module.exports = {
  getTotalPriceByOrderedProduct,
};
