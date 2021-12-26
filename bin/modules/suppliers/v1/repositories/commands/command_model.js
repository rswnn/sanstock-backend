const joi = require('joi');

const addSupplier = joi.object({
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required(),
  userId: joi.number().required()
});

const deleteSupplier = joi.object({
  id: joi.number().required()
});

const updateSupplier = joi.object({
  id: joi.number().required(),
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required(),
  userId: joi.number().required()
});

module.exports = {
  addSupplier,
  deleteSupplier,
  updateSupplier
};
