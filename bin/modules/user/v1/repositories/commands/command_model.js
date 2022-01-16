const joi = require('joi');

const authenticate = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

const addUser = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required()
});

const updateUser = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required()
});

const loginUser = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

module.exports = {
  authenticate,
  addUser,
  updateUser,
  loginUser
};
