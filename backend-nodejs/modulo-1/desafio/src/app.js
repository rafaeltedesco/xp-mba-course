const express = require('express');

const { orderRouter, customerRouter } = require('./routes');

const { handleError } = require('./middlewares/errorHandler');
const { pageNotFound } = require('./middlewares/pageNotFound');

const app = express();

app.use(express.json());

app.use('/orders', orderRouter);
app.use('/customer', customerRouter);

app.use('*', pageNotFound);
app.use(handleError);

module.exports = app;
