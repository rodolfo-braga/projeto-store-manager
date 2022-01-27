const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const product = await productsModel.getProductByName(name);

  if (product.length) return { error: { code: 'conflict', message: 'Product already exists' } };

  const newProduct = await productsModel.createProduct(name, quantity);

  return newProduct;
};

module.exports = {
  createProduct,
};
