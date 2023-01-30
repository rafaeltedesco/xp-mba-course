const { asyncHandleError } = require('../middlewares/errorHandler');
const { productService } = require('../services');

const getTotalPriceByOrderedProduct = asyncHandleError(async (req, res) => {
  const {
    body: { product },
  } = req;

  const totalPrice = await productService.getTotalPriceByOrderedProduct(product);
  return res.status(200).json({
    totalPrice,
  });
});

const getTopSellingProducts = asyncHandleError(async (req, res) => {
  const topSellings = await productService.getTopSellingProducts();
  return res.status(200).json(topSellings);
});

module.exports = {
  getTotalPriceByOrderedProduct,
  getTopSellingProducts,
};
