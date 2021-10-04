const joi = require('joi');

const download = joi.object({
  clientId: joi.string().required(),
  filename: joi.string().required()
});

module.exports = {
};
