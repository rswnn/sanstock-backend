const joi = require('joi');

const addProduct = joi.object({
  sku: joi.string().required(),
  skuInduk: joi.string().required(),
  namaProduk: joi.string().required(),
  varian: joi.string().required(),
  size: joi.number().required(),
  qty: joi.number().default(0),
  hargaModal: joi.number().required()
});

const deleteProduct = joi.object({
  id: joi.number().required()
});

const updateProduct = joi.object({
  sku: joi.string().required(),
  skuInduk: joi.string().required(),
  namaProduk: joi.string().required(),
  varian: joi.string().required(),
  size: joi.number().required(),
  id: joi.number().required()
});

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct
};
