const { orderService } = require('../services');

const createOrder = async (req, res) => {
  const {
    body: { client, product, price },
  } = req;

  const newOrder = await orderService.createOrder({ client, product, price });
  return res.status(201).json(newOrder);
};

module.exports = {
  createOrder,
};
