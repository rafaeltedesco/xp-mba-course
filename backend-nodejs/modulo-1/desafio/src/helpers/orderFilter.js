const { ordersRepository } = require('../repository');

const getDeliveredItemsBy = async (columnToFilter, value) => {
  const orders = (await ordersRepository.getOrders()).pedidos;
  const selectedOrders = orders.filter(
    (order) => order[columnToFilter]?.toLowerCase() === value.toLowerCase(),
  );
  if (selectedOrders.length === 0) {
    const error = new Error(
      `Error: Orders Not found for column "${columnToFilter}"`,
    );
    error.status = 404;
    throw error;
  }
  const deliveredOrders = selectedOrders.filter(({ entregue }) => entregue);
  if (deliveredOrders.length === 0) {
    const error = new Error(
      `Error: Delivered Orders Not found for column "${columnToFilter}"`,
    );
    error.status = 404;
    throw error;
  }
  return deliveredOrders;
};

module.exports = {
  getDeliveredItemsBy,
};
