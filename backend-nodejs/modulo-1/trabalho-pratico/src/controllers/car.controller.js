const { asyncErrorHandler } = require('../middlewares/errorHandler');
const { carService } = require('../service');

// REQ01
const getBrandsWithMoreModels = asyncErrorHandler(async (_req, res) => {
  const brands = await carService.getBrandNamesWithMoreCarsModels();
  return res.status(200).json(brands);
});

// REQ02
const getBrandsWithLessModels = asyncErrorHandler(async (_req, res) => {
  const brands = await carService.getBrandNamesWithLessCarsModels();
  return res.status(200).json(brands);
});

// REQ03
const getNCarsBrandsWithMoreModels = asyncErrorHandler(async (req, res) => {
  const {
    params: { numberOfBrands },
  } = req;
  const brands = await carService.getNCarsBrandNamesWithMoreCarsModels(
    +numberOfBrands,
  );
  return res.status(200).json(brands);
});

// REQ04
const getNCarsBrandsWithLessModels = asyncErrorHandler(async (req, res) => {
  const {
    params: { numberOfBrands },
  } = req;
  const brands = await carService.getNCarsBrandNamesWithLessCarsModels(
    +numberOfBrands,
  );
  return res.status(200).json(brands);
});

// REQ05
const getModelsByBrand = asyncErrorHandler(async (req, res, next) => {
  const {
    body: { brand },
  } = req;
  if (!brand) {
    const error = new Error('"brand" is missing!');
    error.status = 400;
    return next(error);
  }
  const models = await carService.getCarsModelsByBrand(brand);
  return res.status(200).json(models);
});

module.exports = {
  getBrandsWithMoreModels,
  getBrandsWithLessModels,
  getNCarsBrandsWithLessModels,
  getNCarsBrandsWithMoreModels,
  getModelsByBrand,
};
