const express = require('express');
const { orderRouter } = require('./routes');
const { handleError } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/orders', orderRouter);

app.use(handleError);

module.exports = app;
