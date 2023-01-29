const express = require('express');
const { orderRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/orders', orderRouter);

module.exports = app;
