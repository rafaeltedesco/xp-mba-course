const express = require('express');
const { carRouter } = require('./routes');
const { pageNotFound } = require('./middlewares/pageNotFound');

const app = express();

app.use(express.json());

app.use('/marcas', carRouter)

app.use('*', pageNotFound)

module.exports = app;