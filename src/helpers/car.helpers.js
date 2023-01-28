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

const sort = (cars, options = { ascending: true }) => {
  return options.ascending
    ? cars.sort(({ qtdModels: carA }, { qtdModels: carB }) => carA - carB)
    : cars.sort(({ qtdModels: carA }, { qtdModels: carB }) => carB - carA);
};

const slice = (cars, numberOfBrands) => cars.slice(0, numberOfBrands);

const formatOutput = (cars, options = { qtdModels: false}) => {
    return options.qtdModels ? cars.map(({ brand, qtdModels}) => `${brand} - ${qtdModels}`) : cars.map(({brand}) => brand) 
}

module.exports = {
  getMax,
  getMin,
  countCarsModels,
  sort,
  slice,
  formatOutput
};
