const productsService = require('../services/productsService');

const { productSchema } = require('../schemas');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = productSchema.validate(req.body);

  if (error) return next(error);

  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.error) return next(product.error);

  return res.status(200).json(product);
};

const getProducts = async (req, res) => {
  const allProducts = await productsService.getProducts();

  return res.status(200).json(allProducts);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.error) return next(product.error);

  const { error } = productSchema.validate(req.body);

  if (error) return next(error);

  const { name, quantity } = req.body;

  const updatedProduct = await productsService.updateProduct(id, name, quantity);

  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await productsService.getProductById(id);

  if (deletedProduct.error) return next(deletedProduct.error);

  await productsService.deleteProduct(id);

  return res.status(200).json(deletedProduct);
};

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
