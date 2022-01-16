const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const queryModel = require('../repositories/queries/query_model');
const validator = require('../utils/validator');
const jwtAuth = require('../../../../auth/jwt_auth_helper');

const getUser = async (req, res) => {
  const user = await jwtAuth.getUser(req, res);
  return user;
};

const addCash = async (req, res) => {
  const userId = await getUser(req, res);
  const payload = { ...req.body, userId: userId.id };
  const validatePayload = validator.isValidPayload(payload, commandModel.addCash);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await commandHandler.addCash(result.data);
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

const getBalance = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, queryModel.getBalance);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return await queryHandler.getBalance();
  };
  const sendResponse = async (result) => {
    (result.err)
      ? wrapper.response(res, 'fail', result.err, result.message)
      : wrapper.response(res, 'success', result, result.message, result.code);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  addCash,
  getBalance
};
