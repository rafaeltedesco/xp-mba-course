const { Router } = require('express');
const { productController } = require('../controllers');

const router = Router();

router
  .get('/total-price', productController.getTotalPriceByOrderedProduct)
  .get('/top-sellings', productController.getTopSellingProducts);

module.exports = router;
