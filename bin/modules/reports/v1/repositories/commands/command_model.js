const joi = require('joi');

const generateReport = joi.object({
  data: joi.string().required(),
  startDate: joi.date().optional(),
  endDate: joi.date().optional(),
  sku: joi.string().optional(),
  skuInduk: joi.string().optional()
});

module.exports = {
  generateReport
};
