const products = require('express').Router();
const rescue = require('express-rescue');
const productsController = require('./controllers/productsController');

products.post('/', rescue(productsController.createProduct));

products.get('/:id', rescue(productsController.getProductById));

products.get('/', rescue(productsController.getProducts));

products.put('/:id', rescue(productsController.updateProduct));

products.delete('/:id', rescue(productsController.deleteProduct));

module.exports = products;
