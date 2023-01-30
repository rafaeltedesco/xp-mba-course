const { asyncHandleError } = require('../middlewares/errorHandler');
const { orderService } = require('../services');

const createOrder = asyncHandleError(async (req, res) => {
  const {
    body: { client, product, price },
  } = req;

  const newOrder = await orderService.createOrder({ client, product, price });
  return res.status(201).json(newOrder);
});

const updateOrder = asyncHandleError(async (req, res) => {
  const {
    params: { orderId },
    body: {
      client, product, price, delivered,
    },
  } = req;

  await orderService.updateOrder(orderId, {
    client,
    product,
    price,
    delivered,
  });
  return res.status(200).json({
    message: `Order id ${orderId} was updated`,
  });
});

const updateOrderStauts = asyncHandleError(async (req, res) => {
  const {
    params: { orderId },
    body: { delivered },
  } = req;
  await orderService.updateOrderStatus(orderId, delivered);
  return res.status(200).json({
    message: `Order id ${orderId} was updated`,
  });
});

const deleteOrder = asyncHandleError(async (req, res) => {
  const {
    params: { orderId },
  } = req;

  await orderService.deleteOrder(orderId);
  return res.status(204).json();
});

const getOrderById = asyncHandleError(async (req, res) => {
  const {
    params: { orderId },
  } = req;

  const order = await orderService.getOrderById(orderId);
  return res.status(200).json(order);
});

module.exports = {
  createOrder,
  updateOrder,
  updateOrderStauts,
  deleteOrder,
  getOrderById,
};
