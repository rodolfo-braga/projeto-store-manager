const sales = require('express').Router();
const rescue = require('express-rescue');
const salesController = require('./controllers/salesController');

sales.post('/', rescue(salesController.registerSale));

sales.get('/:id', rescue(salesController.getSaleById));

sales.get('/', rescue(salesController.getSales));

sales.put('/:id', rescue(salesController.updateSale));

sales.delete('/:id', rescue(salesController.deleteSale));

module.exports = sales;
