const { orderCalculator, orderFilter } = require('../helpers');
const { ordersRepository } = require('../repository');

const getTotalPriceByOrderedProduct = async (product) => {
  const deliveredOrders = await orderFilter.getDeliveredItemsBy(
    'produto',
    product,
  );
  return orderCalculator.getTotalPrice(deliveredOrders);
};

const getTopSellingProducts = async () => {
  const orders = (await ordersRepository.getOrders()).pedidos;
  const deliveredOrders = orders.filter(({ entregue }) => entregue);
  const salesCounterByProduct = deliveredOrders.reduce((acc, order) => {
    if (order.produto in acc) {
      acc[order.produto] += 1;
      return acc;
    }
    return { ...acc, [order.produto]: 1 };
  }, {});
  const salesOrderedByTopSelling = Object.entries(salesCounterByProduct).sort(
    ([pizza1, qtdd1], [pizza2, qtdd2]) => {
      const orderResolution = qtdd2 - qtdd1 === 0 ? pizza1.localeCompare(pizza2) : qtdd2 - qtdd1;
      return orderResolution;
    },
  );
  return salesOrderedByTopSelling.map(([pizza, qtdd]) => `${pizza} - ${qtdd}`);
};

module.exports = {
  getTotalPriceByOrderedProduct,
  getTopSellingProducts,
};
