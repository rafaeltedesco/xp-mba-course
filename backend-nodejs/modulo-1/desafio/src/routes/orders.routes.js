const { Router } = require('express');
const { orderController } = require('../controllers');

const router = Router();

router
  .get('/:orderId', orderController.getOrderById)
  .post('/', orderController.createOrder)
  .put('/:orderId', orderController.updateOrder)
  .put('/:orderId/change-order-status', orderController.updateOrderStauts)
  .delete('/:orderId', orderController.deleteOrder);

module.exports = router;
