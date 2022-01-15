const joi = require('joi');

const addCash = joi.object({
  dateTime: joi.string().required(),
  type: joi.number().required(),
  cashIn: joi.number(),
  cashOut: joi.number(),
  description: joi.string().required(),
  userId: joi.number()
});

module.exports = {
  addCash
};
