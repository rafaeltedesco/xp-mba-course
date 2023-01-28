const { Router } = require('express');
const { carController } = require('../controllers');

const router = Router();

router
  .get('/maisModelos', carController.getBrandsWithMoreModels)
  .get('/menosModelos', carController.getBrandsWithLessModels)
  .get(
    '/listaMaisModelos/:numberOfBrands',
    carController.getNCarsBrandsWithMoreModels,
  )
  .get(
    '/listaMenosModelos/:numberOfBrands',
    carController.getNCarsBrandsWithLessModels,
  )
  .post('/listaModelos', carController.getModelsByBrand);

module.exports = router;
