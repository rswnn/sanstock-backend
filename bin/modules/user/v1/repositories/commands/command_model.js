const joi = require('joi');

const authenticate = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
});

const userRegister = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().required()
});

const updateUser = joi.object({
  id: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().optional(),
  role: joi.string().required()
});

const deleteUser = joi.object({
  id: joi.string().required(),
});

module.exports = {
  authenticate,
  userRegister,
  updateUser,
  deleteUser
};
