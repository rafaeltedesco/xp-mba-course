const express = require('express');
const { carRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/marcas', carRouter)

module.exports = app;