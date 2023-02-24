import { Router } from 'express';
import { AnimalController } from '../controllers/animal.controller';

const router = Router();

const animalController = new AnimalController();

router
  .get('/', async (req, res) => animalController.findAll(req, res))
  .get('/:id', async (req, res) => animalController.findById(req, res))
  .post('/', async (req, res) => animalController.create(req, res))
  .put('/:id', async (req, res) => animalController.update(req, res))
  .delete('/:id', async (req, res) => animalController.delete(req, res));

export default router;