const salesService = require('../services/salesService');

const { saleSchema } = require('../schemas');

const registerSale = async (req, res, next) => {
  const validateInput = req.body.map(({ product_id: productId, quantity }) => {
    const { error } = saleSchema.validate({ productId, quantity });
    return error;
  });

  if (validateInput.some((error) => error)) return next(validateInput.find((error) => error));

  const newSale = await salesService.registerSale(req.body);

  if (newSale.error) return next(newSale.error);

  return res.status(201).json(newSale);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getSaleById(id);

  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
};

const getSales = async (req, res) => {
  const allSales = await salesService.getSales();

  return res.status(200).json(allSales);
};

const updateSale = async (req, res, next) => {
  const { id: saleId } = req.params;
  const sale = await salesService.getSaleById(saleId);

  if (sale.error) return next(sale.error);

  const saleInfo = req.body;
  const { product_id: productId, quantity } = saleInfo[0];
  const { error } = saleSchema.validate({ productId, quantity });
  if (error) return next(error);

  const updatedSale = await salesService.updateSale(saleId, saleInfo);

  return res.status(200).json(updatedSale);
};

module.exports = {
  registerSale,
  getSaleById,
  getSales,
  updateSale,
};
