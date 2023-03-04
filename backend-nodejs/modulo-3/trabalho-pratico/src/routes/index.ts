import { Router } from 'express';
import animalRouter from './animal.router';
import ownerRouter from './owner.router';
import servicoRouter from './servico.router';

const routers = Router();

routers.use('/animal', animalRouter);
routers.use('/proprietario', ownerRouter);
routers.use('/servico', servicoRouter);

export default routers;
