import { Router } from 'express';
import animalRouter from './animal.router';
import ownerRouter from './owner.router';
import servicoRouter from './servico.router';
import postRouter from './post.router';
import commentRouter from './comment.router';

const routers = Router();

routers.use('/animal', animalRouter);
routers.use('/proprietario', ownerRouter);
routers.use('/servico', servicoRouter);
routers.use('/post', postRouter);
routers.use('/comentario', commentRouter);

export default routers;
