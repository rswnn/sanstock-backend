const joi = require('joi');

const listProduct = joi.object({
  id: joi.number().required()
});

module.exports = {
  listProduct
};
