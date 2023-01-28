
const countCarsModels = (cars) => cars.map((car) => ({
    brand: car.brand,
    models: car.models,
    qtdModels: car.models.length,
  }));

const getMax = (carsModelCounted) => carsModelCounted.reduce(
    (max, car) => {
        if (max.length === 0 || max[0]?.qtdModels === car.qtdModels) {
            max.push(car);
            return max;
        }
        if (max[0].qtdModels > car.qtdModels) {
            return max;
        }
        return [car];
    },
    []
  );

const getMin = (carsModelCounted) => carsModelCounted.reduce(
    (max, car) => {
        if (max.length === 0 || max[0]?.qtdModels === car.qtdModels) {
            max.push(car);
            return max;
        }
        if (max[0].qtdModels < car.qtdModels) {
            return max;
        }
        return [car];
    },
    []
  );

  module.exports = {
    getMax,
    getMax,
    countCarsModels
  }