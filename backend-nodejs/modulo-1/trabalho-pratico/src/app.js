const express = require('express');
const { carRouter } = require('./routes');
const { pageNotFound } = require('./middlewares/pageNotFound');
const { handleError } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/marcas', carRouter)

app.use('*', pageNotFound)

app.use(handleError)

module.exports = app;