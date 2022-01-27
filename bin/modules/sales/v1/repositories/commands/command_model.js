const joi = require('joi');

const addSale = joi.object({
  sku: joi.string(),
  namaProduk: joi.string(),
  varian: joi.string(),
  invoiceMerchant: joi.string(),
  hargaJual: joi.number(),
  pajak: joi.number(),
  merchantFee: joi.number(),
  biayaLain: joi.number(),
  ongkir: joi.number(),
  userId: joi.number(),
  productId: joi.number(),
  merchantId: joi.number(),
  qty: joi.number()
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
  id: joi.number().required(),
  userId: joi.number().required(),
  productId: joi.number().required(),
  merchantId: joi.number().required(),
  qty: joi.number()
});

const addStock = joi.object({
  sku: joi.string(),
  namaProduk: joi.string(),
  varian: joi.string(),
  userId: joi.number(),
  productId: joi.number(),
  qty: joi.number(),
  hargaModal: joi.number()
});

module.exports = {
  addSale,
  deleteSale,
  updateSale,
  addStock
};
