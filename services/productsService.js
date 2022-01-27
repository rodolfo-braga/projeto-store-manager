const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const product = await productsModel.getProductByName(name);

  if (product.length) return { error: { code: 'conflict', message: 'Product already exists' } };

  const newProduct = await productsModel.createProduct(name, quantity);

  return newProduct;
};

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product.length) return { error: { code: 'notFound', message: 'Product not found' } };

  return product[0];
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await productsModel.updateProduct(id, name, quantity);

  return updatedProduct;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
};
