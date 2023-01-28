const { carService } = require('../service');

// REQ01
const getBrandsWithMoreModels = async (_req, res) => {
    const brands = await carService.getBrandNamesWithMoreCarsModels();
    return res.status(200).json(brands);
};

// REQ02
const getBrandsWithLessModels = async (_req, res) => {
    const brands = await carService.getBrandNamesWithLessCarsModels();
    return res.status(200).json(brands);
};

// REQ03
const getNCarsBrandsWithMoreModels = async (req, res) => {
    const { params: { numberOfBrands }} = req;
    const brands = await carService.getNCarsBrandNamesWithMoreCarsModels(+numberOfBrands);
    return res.status(200).json(brands);
};

// REQ04
const getNCarsBrandsWithLessModels = async (req, res) => {
    const { params: { numberOfBrands }}= req;
    const brands = await carService.getNCarsBrandNamesWithLessCarsModels(+numberOfBrands);
    return res.status(200).json(brands);
}

// REQ05
const getModelsByBrand = async (req, res) => {
    const { body: { brand }} = req;
    const models = await carService.getCarsModelsByBrand(brand);
    return res.status(200).json(models);
}


module.exports = {
    getBrandsWithMoreModels,
    getBrandsWithLessModels,
    getNCarsBrandsWithLessModels,
    getNCarsBrandsWithMoreModels,
    getModelsByBrand
}