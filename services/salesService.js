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

const getSales = async () => {
  const sales = await salesModel.getSales();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale.length) return { error: { code: 'notFound', message: 'Sale not found' } };

  return sale;
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
};
