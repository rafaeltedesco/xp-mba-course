import { Router } from 'express';
import animalRouter from './animal.router';
import ownerRouter from './owner.router';

const routers = Router();

routers.use('/animal', animalRouter);
routers.use('/proprietario', ownerRouter);

export default routers;
