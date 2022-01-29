const sales = require('express').Router();
const rescue = require('express-rescue');
const Joi = require('joi');
const salesService = require('../services/salesService');

const salesSchema = Joi.object({
  productId: Joi.number().integer().required().label('product_id'),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': '"quantity" must be a number larger than or equal to 1',
      'number.integer': '"quantity" must be a number larger than or equal to 1',
      'number.min': '"quantity" must be a number larger than or equal to 1',
    }),
});

sales.post('/', rescue(async (req, res, next) => {
  const validateInput = req.body.map(({ product_id: productId, quantity }) => {
    const { error } = salesSchema.validate({ productId, quantity });
    return error;
  });

  if (validateInput.some((error) => error)) return next(validateInput.find((error) => error));

  const newSale = await salesService.registerSale(req.body);

  if (newSale.error) return next(newSale.error);

  return res.status(201).json(newSale);
}));

module.exports = sales;
