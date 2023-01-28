const { stringUtils } = require('../utils/string-util');

const countCarsModels = (cars) =>
  cars.map((car) => ({
    brand: car.brand,
    models: car.models,
    qtdModels: car.models.length,
  }));

const getMax = (carsModelCounted) =>
  carsModelCounted.reduce((max, car) => {
    if (max.length === 0 || max[0]?.qtdModels === car.qtdModels) {
      max.push(car);
      return max;
    }
    if (max[0].qtdModels > car.qtdModels) {
      return max;
    }
    return [car];
  }, []);

const getMin = (carsModelCounted) =>
  carsModelCounted.reduce((max, car) => {
    if (max.length === 0 || max[0]?.qtdModels === car.qtdModels) {
      max.push(car);
      return max;
    }
    if (max[0].qtdModels < car.qtdModels) {
      return max;
    }
    return [car];
  }, []);

const resolveTie = (carA, carB) => {
    return carA.localeCompare(carB);
}
  

const sort = (cars, options = { ascending: true }) => {
  return options.ascending
    ? cars.sort(
        ({ brand: carA, qtdModels: qtdA }, { brand: carB, qtdModels: qtdB }) =>
          qtdA - qtdB === 0 ? resolveTie(carA, carB) : qtdA - qtdB
      )
    : cars.sort(({ brand: carA, qtdModels: qtdA }, { brand: carB, qtdModels: qtdB }) =>
    qtdB - qtdA === 0 ? resolveTie(carA, carB) : qtdB - qtdA
    );
};

const slice = (cars, numberOfBrands) => cars.slice(0, numberOfBrands);

const formatOutput = (cars, options = { qtdModels: false }) => {
  return options.qtdModels
    ? cars.map(({ brand, qtdModels }) => `${brand} - ${qtdModels}`)
    : cars.map(({ brand }) => brand);
};

const getModelsByBrand = (cars, brand) => cars.find(
    ({ brand: repoCarBrand }) =>
      stringUtils.lower(repoCarBrand) === stringUtils.lower(brand)
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
