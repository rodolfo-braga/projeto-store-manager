const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const registerSale = async (sale) => {
  const products = await Promise.all(sale
    .map(async ({ product_id: id }) => productsModel.getProductById(id)));

  if (products.some((product) => !product.length)) {
    return { error: { code: 'notFound', message: 'Product not found' } };
  }

  const newSale = await salesModel.registerSale(sale);

  return newSale;
};

module.exports = {
  registerSale,
};
