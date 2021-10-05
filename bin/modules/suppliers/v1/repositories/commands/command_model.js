const joi = require('joi');

const addSupplier = joi.object({
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required()
});

const deleteSupplier = joi.object({
  id: joi.number().required()
});

const updateSupplier = joi.object({
  id: joi.number().required(),
  nama: joi.string().required(),
  email: joi.string().email().required(),
  kontak: joi.string().required(),
  detail: joi.string().required()
});

module.exports = {
  addSupplier,
  deleteSupplier,
  updateSupplier
};
