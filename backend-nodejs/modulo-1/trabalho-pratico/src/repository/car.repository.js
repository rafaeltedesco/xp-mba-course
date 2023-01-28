const config = require('../config/config')
const { fileReader } = require('../utils/io')


const getAllCars = async () => {
    const cars = await fileReader.readFileAsync(config['cars-db-path'])
    return cars
}

module.exports = {
    getAllCars
}