const Joi = require('joi');

const qunatityErrorMessage = '"quantity" must be a number larger than or equal to 1';

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': qunatityErrorMessage,
      'number.integer': qunatityErrorMessage,
      'number.min': qunatityErrorMessage,
    }),
});

const saleSchema = Joi.object({
  productId: Joi.number().integer().required().label('product_id'),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': qunatityErrorMessage,
      'number.integer': qunatityErrorMessage,
      'number.min': qunatityErrorMessage,
    }),
});

module.exports = {
  productSchema,
  saleSchema,
};
