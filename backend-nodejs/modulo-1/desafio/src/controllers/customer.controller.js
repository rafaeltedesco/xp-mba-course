const { asyncHandleError } = require('../middlewares/errorHandler');
const { customerService } = require('../services');

const getTotalPriceByCustomer = asyncHandleError(async (req, res) => {
  const {
    body: { customer },
  } = req;

  const totalPrice = await customerService.getTotalPriceByCustomer(customer);

  return res.status(200).json({
    totalPrice,
  });
});

module.exports = {
  getTotalPriceByCustomer,
};
