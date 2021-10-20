const joi = require('joi');

const addSale = joi.object({
  sku: joi.string().required(),
  namaProduk: joi.string().required(),
  varian: joi.string().required(),
  invoiceMerchant: joi.string().required(),
  hargaJual: joi.number().required(),
  pajak: joi.number().required(),
  merchantFee: joi.number().required(),
  biayaLain: joi.number().required(),
  ongkir: joi.number().required(),
  kodeMrc: joi.string().required()
});

const deleteSale = joi.object({
  id: joi.number().required()
});

const updateSale = joi.object({
  sku: joi.string().required(),
  namaProduk: joi.string().required(),
  varian: joi.string().required(),
  invoiceMerchant: joi.string().required(),
  hargaJual: joi.number().required(),
  pajak: joi.number().required(),
  merchantFee: joi.number().required(),
  biayaLain: joi.number().required(),
  ongkir: joi.number().required(),
  kodeMrc: joi.string().required(),
  id: joi.number().required()
});

module.exports = {
  addSale,
  deleteSale,
  updateSale
};
