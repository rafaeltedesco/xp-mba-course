import { Router } from 'express';
import { ServicoController } from '../controllers/servico.controller';

const router = Router();

const servicoController = new ServicoController();

router
    .get('/', async (req, res) => servicoController.findAll(req, res))
    .post('/', async (req, res) => servicoController.create(req, res))
    
export default router;