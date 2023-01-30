const { Router } = require('express');
const { customerController } = require('../controllers');

const router = Router();

router
  .get('/', customerController.getTotalPriceByCustomer);

module.exports = router;
