const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');

const authenticate = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.authenticate);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.authenticate(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

const register = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.userRegister);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.register(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

const getUsers = async (req, res) => {
  const postRequest = async (result) => {
    return await queryHandler.getUsers();
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest());
};

const updateUser = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.updateUser);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.updateUser(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteUser = async (req, res) => {
  const payload = req.params;
  const validatePayload = validator.isValidPayload(payload, commandModel.deleteUser);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.deleteUser(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  authenticate,
  register,
  getUsers,
  updateUser,
  deleteUser
};
