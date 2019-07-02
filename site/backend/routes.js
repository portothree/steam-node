const express = require('express');
const ItemController = require('./controllers/ItemController');

const routes = new express.Router();

routes.post('/items', ItemController.store);

module.exports = routes;