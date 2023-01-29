const { Router } = require('express');
const { orderController } = require('../controllers');

const router = Router();

router.post('/', orderController.createOrder);

module.exports = router;
