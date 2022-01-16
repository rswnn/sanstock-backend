const joi = require('joi');

const addMerchant = joi.object({
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required(),
  userId: joi.number().required()
});

const deleteMerchant = joi.object({
  id: joi.number().required()
});

const updateMerchant = joi.object({
  id: joi.number().required(),
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required(),
  userId: joi.number().required()
});

module.exports = {
  addMerchant,
  deleteMerchant,
  updateMerchant
};
