const { Router } = require('express');
const { carController } = require('../controllers');

const router = Router();

router
    .get('/maisModelos', carController.getBrandsWithMoreModels)
    .get('/menosModels', carController.getBrandsWithLessModels)
    .get('/listaMaisModels/:numberOfBrands', carController.getNCarsBrandsWithMoreModels)
    .get('/listaMenosModels/:numberOfBrands', carController.getNCarsBrandsWithLessModels)
    .post('/listaModelos', carController.getModelsByBrand);

module.exports = router;