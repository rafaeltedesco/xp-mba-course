const { carHelper } = require('../helpers');
const { carRepository } = require('../repository');

const getBrandNamesWithMoreCarsModels = async () => 
    carHelper.getMax(carHelper.countCarsModels(await carRepository.getAllCars())).map(car => car.brand);

const getBrandNamesWithLessCarsModels = async () => 
    carHelper.getMin(carHelper.countCarsModels(await carRepository.getAllCars())).map(car => car.brand);

module.exports = {
  getBrandNamesWithMoreCarsModels,
  getBrandNamesWithLessCarsModels
};
