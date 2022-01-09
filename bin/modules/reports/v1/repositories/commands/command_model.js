const joi = require('joi');

const generateReport = joi.object({
  data: joi.string().required(),
  startDate: joi.date().optional(),
  endDate: joi.date().optional(),
  sku: joi.string().optional(),
  skuInduk: joi.string().optional(),
  userId: joi.string(),
  supplierId: joi.string(),
  merchantId: joi.string().optional(),
  productId: joi.string().optional()
});

module.exports = {
  generateReport
};
