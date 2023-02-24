import { Router } from 'express';
import { OwnerController } from '../controllers/owner.controller';

const router = Router();

const ownerController = new OwnerController();

router
  .get('/', async (req, res)=> ownerController.findAll(req, res))
  .get('/:id', async (req, res) => ownerController.findById(req, res))
  .post('/', async (req, res) => ownerController.create(req, res))
  .put('/:id', async (req, res) => ownerController.update(req, res))
  .delete('/:id', async (req, res) => ownerController.delete(req, res));

export default router;