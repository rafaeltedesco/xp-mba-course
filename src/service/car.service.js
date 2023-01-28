const { carHelper } = require('../helpers');
const { carRepository } = require('../repository');

const getBrandNamesWithMoreCarsModels = async () =>
  carHelper
    .getMax(carHelper.countCarsModels(await carRepository.getAllCars()))
    .map((car) => car.brand);

const getBrandNamesWithLessCarsModels = async () =>
  carHelper
    .getMin(carHelper.countCarsModels(await carRepository.getAllCars()))
    .map((car) => car.brand);

const getNCarsBrandNamesWithMoreCarsModels = async (numberOfBrands) => {
  return carHelper
    .countCarsModels(await carRepository.getAllCars())
    .sort(({ qtdModels: carA }, { qtdModels: carB }) => carB - carA)
    .slice(0, numberOfBrands).map(({ brand, qtdModels }) => `${brand} - ${qtdModels}`);
};

const getNCarsBrandNamesWithLessCarsModels = async (numberOfBrands) => {
    return carHelper
      .countCarsModels(await carRepository.getAllCars())
      .sort(({ qtdModels: carA }, { qtdModels: carB }) => carA - carB)
      .slice(0, numberOfBrands).map(({ brand, qtdModels }) => `${brand} - ${qtdModels}`);
  };

module.exports = {
  getBrandNamesWithMoreCarsModels,
  getBrandNamesWithLessCarsModels,
  getNCarsBrandNamesWithMoreCarsModels,
  getNCarsBrandNamesWithLessCarsModels
};
