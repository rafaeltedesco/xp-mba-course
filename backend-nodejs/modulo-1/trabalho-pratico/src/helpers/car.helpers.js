const { stringUtils } = require('../utils/string-util');

const countCarsModels = (cars) => cars.map((car) => ({
  brand: car.brand,
  models: car.models,
  qtdModels: car.models.length,
}));

const getMax = (carsModelCounted) => carsModelCounted.reduce((max, car) => {
  if (max.length === 0 || max[0]?.qtdModels === car.qtdModels) {
    max.push(car);
    return max;
  }
  if (max[0].qtdModels > car.qtdModels) {
    return max;
  }
  return [car];
}, []);

const getMin = (carsModelCounted) => carsModelCounted.reduce((max, car) => {
  if (max.length === 0 || max[0]?.qtdModels === car.qtdModels) {
    max.push(car);
    return max;
  }
  if (max[0].qtdModels < car.qtdModels) {
    return max;
  }
  return [car];
}, []);

const resolveTie = (carA, carB) => carA.localeCompare(carB);

const sort = (cars, options = { ascending: true }) => {
  const sortedCars = options.ascending
    ? cars.sort(({ brand: carA, qtdModels: qtdA }, { brand: carB, qtdModels: qtdB }) => {
      const resultOfComparison = qtdA - qtdB === 0 ? resolveTie(carA, carB) : qtdA - qtdB;
      return resultOfComparison;
    })
    : cars.sort(({ brand: carA, qtdModels: qtdA }, { brand: carB, qtdModels: qtdB }) => {
      const resultOfComparison = qtdB - qtdA === 0 ? resolveTie(carA, carB) : qtdB - qtdA;
      return resultOfComparison;
    });
  return sortedCars;
};

const slice = (cars, numberOfBrands) => cars.slice(0, numberOfBrands);

const formatOutput = (cars, options = { qtdModels: false }) => {
  const output = options.qtdModels
    ? cars.map(({ brand, qtdModels }) => `${brand} - ${qtdModels}`)
    : cars.map(({ brand }) => brand);
  return output;
};

const getModelsByBrand = (cars, brand) => cars.find(
  ({ brand: repoCarBrand }) => stringUtils.lower(repoCarBrand) === stringUtils.lower(brand),
) || { models: [] };

module.exports = {
  getMax,
  getMin,
  countCarsModels,
  sort,
  slice,
  formatOutput,
  getModelsByBrand,
};
