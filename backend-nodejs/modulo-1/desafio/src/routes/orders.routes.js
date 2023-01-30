const { Router } = require('express');
const { orderController } = require('../controllers');

const router = Router();

router
  .post('/', orderController.createOrder)
  .put('/:orderId', orderController.updateOrder)
  .put('/:orderId/change-order-status', orderController.updateOrderStauts)
  .delete('/:orderId', orderController.deleteOrder);

module.exports = router;
