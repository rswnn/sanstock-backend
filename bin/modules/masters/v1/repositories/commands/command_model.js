const joi = require('joi');

const addMerchant = joi.object({
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required()
});

const deleteMerchant = joi.object({
  id: joi.number().required()
});

const updateMerchant = joi.object({
  id: joi.number().required(),
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required()
});

module.exports = {
  addMerchant,
  deleteMerchant,
  updateMerchant
};
