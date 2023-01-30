const { Router } = require('express');
const { productController } = require('../controllers');

const router = Router();

router
  .get('/', productController.getTotalPriceByOrderedProduct);

module.exports = router;
