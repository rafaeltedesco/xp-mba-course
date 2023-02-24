import express from 'express';

import routers from './routes'

const app = express();

app.use(express.json());

app.use(routers);
// import { Animal } from './models/Animal';
// import { Owner } from './models/Owner';

// const owner = new Owner();
// owner.findAll().then(result => console.log(result));

// const animals = new Animal();
// animals.findAll().then(result => console.log(result))



export default app;

