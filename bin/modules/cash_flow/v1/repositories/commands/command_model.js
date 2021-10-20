const joi = require('joi');

const addCash = joi.object({
  dateTime: joi.date().required(),
  type: joi.number().required(),
  cashIn: joi.number(),
  cashOut: joi.number(),
  description: joi.string().required()
});

module.exports = {
  addCash
};
