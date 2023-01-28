const { carHelper } = require('../helpers');
const { carRepository } = require('../repository');

const getBrandNamesWithMoreCarsModels = async () =>
  carHelper.formatOutput(
    carHelper.getMax(
      carHelper.countCarsModels(await carRepository.getAllCars())
    )
  );

const getBrandNamesWithLessCarsModels = async () =>
  carHelper.formatOutput(
    carHelper.getMin(
      carHelper.countCarsModels(await carRepository.getAllCars())
    )
  );

const getNCarsBrandNamesWithMoreCarsModels = async (numberOfBrands) => {
  return carHelper.formatOutput(
    carHelper.slice(
      carHelper.sort(
        carHelper.countCarsModels(await carRepository.getAllCars()),
        { ascending: false }
      ),
      numberOfBrands
    ),
    { qtdModels: true }
  );
};

const getNCarsBrandNamesWithLessCarsModels = async (numberOfBrands) => {
  return carHelper.formatOutput(
    carHelper.slice(
      carHelper.sort(
        carHelper.countCarsModels(await carRepository.getAllCars()),
        { ascending: true }
      ),
      numberOfBrands
    ),
    { qtdModels: true }
  );
};

const getCarsModelsByBrand = async (brand) => {
  const cars = await carRepository.getAllCars();
  const { models } = cars.find(
    ({ brand: repoCarBrand }) =>
      repoCarBrand.toLowerCase() === brand.toLowerCase()
  ) || { models: [] };
  return models;
};

module.exports = {
  getBrandNamesWithMoreCarsModels,
  getBrandNamesWithLessCarsModels,
  getNCarsBrandNamesWithMoreCarsModels,
  getNCarsBrandNamesWithLessCarsModels,
  getCarsModelsByBrand,
};