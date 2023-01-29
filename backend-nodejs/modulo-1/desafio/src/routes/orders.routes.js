const { Router } = require('express');
const { orderController } = require('../controllers');

const router = Router();

router
  .post('/', orderController.createOrder)
  .put('/:orderId', orderController.updateOrder);

module.exports = router;
