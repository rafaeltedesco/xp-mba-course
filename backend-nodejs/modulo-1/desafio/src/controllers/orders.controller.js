const { orderService } = require('../services');

const createOrder = async (req, res) => {
  const {
    body: { client, product, price },
  } = req;

  const newOrder = await orderService.createOrder({ client, product, price });
  return res.status(201).json(newOrder);
};

const updateOrder = async (req, res) => {
  const {
    params: { orderId },
    body: {
      client, product, price, delivered,
    },
  } = req;

  await orderService.updateOrder(orderId, {
    client, product, price, delivered,
  });
  return res.status(200).json({
    message: `Order id ${orderId} was updated`
  });
};

module.exports = {
  createOrder,
  updateOrder,
};
