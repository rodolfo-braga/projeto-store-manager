const Joi = require('joi');
const products = require('express').Router();
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': '"quantity" must be a number larger than or equal to 1',
      'number.integer': '"quantity" must be a number larger than or equal to 1',
      'number.min': '"quantity" must be a number larger than or equal to 1',
    }),
});

products.post('/', rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = productSchema.validate(req.body);

  if (error) return next(error);

  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
}));

products.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
}));

products.get('/', rescue(async (req, res) => {
  const allProducts = await productsService.getProducts();

  return res.status(200).json(allProducts);
}));

products.put('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.error) return next(product.error);

  const { error } = productSchema.validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;

  const updatedProduct = await productsService.updateProduct(id, name, quantity);

  return res.status(200).json(updatedProduct);
}));

module.exports = products;
