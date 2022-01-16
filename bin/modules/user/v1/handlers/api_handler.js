const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const validator = require('../utils/validator');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const queryModel = require('../repositories/queries/query');
// const user = require('../repositories/commands/domain');

const getUser = async (req, res) => {
  const user = await jwtAuth.getUser(req, res);
  return user;
};

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

const addUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.addUser);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.addUser(payload);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message);
  };
  sendResponse(await postRequest(validatePayload));
};

const loginUser = async (req, res) => {
  // const userId = await getUser(req, res);
  // const payload = {
  //   ...req.params,
  //   ...req.body,
  //   userId: userId.userId
  // };
  // const validatePayload = validator.isValidPayload(payload, commandModel.updateUser);
  // const postRequest = async (result) => {
  //   if (result.err) {
  //     return result;
  //   }
  //   return await commandHandler.updateUser(payload);
  // };
  // const sendResponse = async (result) => {
  //   (result.err)
  //     ? wrapper.response(res, 'fail', result.err, result.message)
  //     : wrapper.response(res, 'success', result, result.message);
  // };
  // sendResponse(await postRequest(validatePayload));
  const user = await getUser(req, res);
  const payload = {
    ...req.params,
    ...req.body,
    username: user.username,
    password: user.password
  };
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

// update user
const updateUser = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = {
    ...req.params,
    ...req.body,
    userId: userId.userId
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

// list user
const getListUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.listUser);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.listUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  authenticate,
  addUser,
  updateUser,
  loginUser,
  getListUser
};
